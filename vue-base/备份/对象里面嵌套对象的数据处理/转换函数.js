import { evolve, has, mergeRight, zipObj } from "ramda";
import { sin, cos, multiply } from 'mathjs'
/*
矩阵的一般形式
T = [
    [a, b, p],
    [c, d, q],
    [l, m, s]
]
a, b, c, d 是比例, 对称, 错切, 旋转变换
p, q 是透视变换
l, m 是平移变换
s  是全比例变换
*/
const unitMatrix = [ // 单位矩阵
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]
// 平移矩阵, 从坐标原点开始平移的矩阵
const moveMatrix = (dx, dy) => [
    [1, 0, 0],
    [0, 1, 0],
    [dx, dy, 1]
]

// 旋转矩阵, 从坐标原点开始旋转的矩阵
const rotateMatrix = (theta) => [
    [cos(theta), sin(theta), 0],
    [-sin(theta), cos(theta), 0],
    [0, 0, 1]
]

const rotateAnyPointMatrix = (rotateCenter, rotateAngle) => {
    const T1 = moveMatrix(-rotateCenter.x, -rotateCenter.y, 1)
    const T2 = rotateMatrix(rotateAngle)
    const T3 = moveMatrix(rotateCenter.x, rotateCenter.y, 1)
    // 获取 绕任意点旋转的矩阵, 为了性能, 实际使用时通过 mathematoca 软件进行计算最终的矩阵
    return [T1, T2, T3].reduce((prev, current) => multiply(prev, current), unitMatrix)
}
const rotateAndMoveMatrix = (moveTo, rotateCenter, rotateAngle) => {
    // TODO: 如果没有 旋转角度, 就是平移, 没有旋转中心, 也是平移
    const T1 = moveMatrix(moveTo.x, moveTo.y, 1)
    const T2 = rotateAnyPointMatrix(rotateCenter, rotateAngle)
    return [T1, T2].reduce((prev, current) => multiply(prev, current), unitMatrix)
}



const rotateAndMovePoint = (pt, moveTo, rotateCener, rotateAngle) => {
    // TODO: 没有考虑角度的旋转, 如果点中含有圆弧起始角和结束角, 这个角度也要转动, 取消角度的方式画圆弧
    // 用 evolve 转换
    const T = rotateAndMoveMatrix(moveTo, rotateCener, rotateAngle)

    const multiplyFn = (pt) => {
        return zipObj(['x', 'y'], multiply([pt.x, pt.y, 1], T))
    }
    const transformations = {
        centerPoint: multiplyFn,
        startPoint: multiplyFn,
        endPoint: multiplyFn
    }

    let root = {}
    if (has('x', pt) && has('y', pt)) {
        root = mergeRight(pt, multiplyFn(pt))
    }
    //!!!!!!!!!!!!!! 这里如果root是空的对象什么也得不到
    const result = evolve(transformations, root)

    return result
    // return pt
}


const rotateAndMovePoints = (pts, moveTo, rotateCener, rotateAngle) => {
    console.log("执行 transformations", pts.map(point => rotateAndMovePoint(point, moveTo, rotateCener, rotateAngle)))
    return pts.map(point => rotateAndMovePoint(point, moveTo, rotateCener, rotateAngle))
}



const gpAroundArc = {
    cx: 200,
    cy: 200,
    R: 100,
    betweenAngle: Math.PI / 2,
    number: 3
}
const aroundArcShape = (gp) => [
    { operate: 'M', x: gp.R * Math.cos(-gp.betweenAngle / 2), y: gp.R * Math.sin(-gp.betweenAngle / 2) },
    {
        operate: 'A',
        centerPoint: {
            x: 0,
            y: 0,
        },
        r: gp.R,
        startPoint: {
            x: gp.R * Math.cos(-gp.betweenAngle / 2),
            y: gp.R * Math.sin(-gp.betweenAngle / 2),
        },
        endPoint: {
            x: gp.R * Math.cos(gp.betweenAngle / 2),
            y: gp.R * Math.sin(gp.betweenAngle / 2),
        }
    }
]
//! 由于旋转圆弧时中心点 + 起始角, 结束角的角度不好采用矩阵处理, 所以, 画圆弧的操作仍然采用 svg 自带的方式.
//! svg 之所以采用这种方式还是非常非常合理的, 要多思考下人家为什么这么设计
const makeArc = (cp, sp, ep) => {

    const xAxisRoatation = 0 // x 轴不旋转, 因为是圆形, 转不转都一样
    const PI = Math.PI
    // 参数: 起始点坐标 x, y,  圆弧 x, y 轴上的半径,椭圆轴的旋转角, 大小弧, 交换位, 结束点
    // 根据点的位置计算起始角和结束角
    const getAngle = (cp, pt) => {
        const y = pt.y - cp.y
        const x = pt.x - cp.x
        return y >= 0 ? Math.atan2(y) : 2 * Math.PI + Math.atan2(x)
    }
    const r = Math.sqrt(Math.pow(sp.y - cp.y, 2) + Math.pow(sp.x - cp.x, 2))

    const sAngle = getAngle(cp, sp)
    const eAngle = getAngle(cp, ep)
    const betweenAngles = Math.abs(eAngle - sAngle)
    // sAngle < eAngle 在屏幕坐标系下是顺时针转动, 为正
    const sweepFlag = eAngle > sAngle ? 1 : 0
    const largeArcFlag = betweenAngles < PI ? 0 : 1
    return `M ${sp.x} ${sp.y} A${r} ${r}, ${xAxisRoatation} , ${largeArcFlag}, ${sweepFlag}, ${ep.x} ${ep.y} `
}

// 根据坐标点创建形状, 返回 path 拼接的字符串
const makePath = (pts) => {
    // TODO: 如果没有操作符, 默认第1个为 M, 其余为 L
    let s = ''
    if (pts[0].operate !== "M") console.log("第1个点必须是 M")

    for (let i = 0; i < pts.length; i++) {
        let ptsI = pts[i]

        if (ptsI.operate === 'A') {
            s += makeArc(ptsI.centerPoint, ptsI.startPoint, ptsI.endPoint)
        } else {
            s += ptsI.operate + ' ' + ptsI.x + ' ' + ptsI.y + ' '
        }
    }
    return s
}

const makeListPath = (shape, moveTo, rotateCenter, rotateAngle) => {
    // shape 是由一系列点和这些点的连接构成的, 只考虑直线和圆弧连接组成的
    // 简单图形.
    // 这些点在屏幕坐标系下定义, 坐标原点在左上角.
    // 需要将这些点通过平移旋转到需要的位置

    const pts = rotateAndMovePoints(shape, moveTo, rotateCenter, rotateAngle)

    return makePath(pts)
}


const moveArc = makeListPath(
    aroundArcShape(gpAroundArc), { x: 200, y: 200 }, { x: 200, y: 200 }, 1
)

// console.log(moveArc)