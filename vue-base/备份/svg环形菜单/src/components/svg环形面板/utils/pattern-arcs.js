import { multiply } from 'mathjs'
import { evolve, has, flatten, isEmpty, mergeRight, zipObj } from 'ramda'
import { rotationPointMatrix } from "./matrices";
import { makeSinglePath } from "./make-path";

// 对 有 x, y 属性的曲线对象进行转动, 对圆弧图形尺寸参数里的坐标点都转化一下
const rotationPoints = (curvePoints, rotationPoint, rotationAngle) => {
    // 用转动矩阵进行转动
    const T = rotationPointMatrix(rotationPoint, rotationAngle)
    const rotationPointFn = (pt) => {
        return zipObj(['x', 'y'], multiply([pt.x, pt.y, 1], T))
    }

    const transformations = {
        // 有就会运行, 没有就不会运行
        startPoint: rotationPointFn,
        centerPoint: rotationPointFn,
        endPoint: rotationPointFn
    }
    let root = {}
    // 如果对象的根部有 x, y 属性, 就转化这个坐标, 没有就跳过
    if (has('x', curvePoints) && has('y', curvePoints)) {
        root = mergeRight(curvePoints, rotationPointFn(curvePoints))
    }
    // 如果 root 为 空, 就要用原来的对象
    root = isEmpty(root) ? curvePoints : root
    const result = evolve(transformations, root)
    return result
}

const circularPatternPoints = (curvePoints, rotationPoint, count, pitchAngle) => {
    // curvePoints 要阵列的对象, rotationPoint 旋转中心点, count 数量, pitchAngle 节距角
    let list = []
    for (let i = 0; i < count; i++) {
        // 生成整理的转动后的坐标数组
        list.push(rotationPoints(curvePoints, rotationPoint, i * pitchAngle))
    }
    return list
}
// 对多个曲线进行阵列, 例如, 可以对由圆, 直线组成的图形进行阵列, 也可以对多条
// 直线进行阵列
const circularPatternCurves = (curves, rotationPoint, count, pitchAngle) => {
    return curves.map(curvePoints => {
        return circularPatternPoints(curvePoints, rotationPoint, count, pitchAngle)
    })
}

const useArcPattern = (curvePoints, rotationPoint, count, pitchAngle) => {

    // 先对 curvePoints 进行环形阵列,
    const curves = circularPatternPoints(curvePoints, rotationPoint, count, pitchAngle)

    // 再对阵列后很多的 curvePointss 进行路径描绘
    return curves.map(d => makeSinglePath(d))
}

const ticks = (ticksParams, centerPoint) => {
    const { r, countSegments, numberPerSegments } = ticksParams
    const iAngle = 2 * Math.PI / countSegments // 分度角
    const jAngle = iAngle / numberPerSegments // 分度角里再细分的角度

    // 生成直线的点
    const linesPoints = []
    const start = countSegments > 1 ? 1 : 0
    for (let i = start; i < numberPerSegments; i++) {
        // 要转到12点钟的位置
        const angle = i * jAngle - Math.PI / 2

        const startPoint = {
            x: r * Math.cos(angle) + centerPoint.x,
            y: r * Math.sin(angle) + centerPoint.y
        }
        let endPoint
        // interval 间隔的意思, 间隔多少有一个长的标记
        if (ticksParams.intervalMark && i % ticksParams.intervalMark === 0) { // 长的线
            endPoint = {
                x: (r - ticksParams.longLine) * Math.cos(angle) + centerPoint.x,
                y: (r - ticksParams.longLine) * Math.sin(angle) + centerPoint.y
            }
        } else { // 短的线
            endPoint = {
                x: (r - ticksParams.shortLine) * Math.cos(angle) + centerPoint.x,
                y: (r - ticksParams.shortLine) * Math.sin(angle) + centerPoint.y
            }
        }
        linesPoints.push({ operator: "L", startPoint, endPoint })

    }
    // 对 很多的直线进行阵列, 并拍平数组, 二维数组变一维
    return flatten(circularPatternCurves(linesPoints, centerPoint, countSegments, iAngle))
}
// 创建路径
const useTicks = (ticksParams, centerPoint) => {
    const t = ticks(ticksParams, centerPoint)
    return t.map(tick => makeSinglePath(tick))
}

export {
    rotationPoints,
    circularPatternPoints,
    useArcPattern,
    useTicks
}