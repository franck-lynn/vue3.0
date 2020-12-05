import { fail } from "./helps"
import { rotationPoints } from "./pattern-arcs";

// const createArcTwoPointAndRadius = (gp) => {
//     // 中心点由 参数传进来
//     const sAngle = Math.atan2(gp.startPoint.y - gp.centerPoint.y, gp.startPoint.x - gp.centerPoint.x)
//     // 求结束角
//     const eAngle = Math.atan2(gp.endPoint.y - gp.centerPoint.y, gp.endPoint.x - gp.centerPoint.y)
//     // 求夹角
//     const xAxisRoatation = 0 // x 轴不旋转, 因为是圆形, 转不转都一样
//     const PI = Math.PI
//     const betweenAngles = Math.abs(eAngle - sAngle)
//     let sweepFlag = 1 // 只取顺时针
//     let largeArcFlag = betweenAngles < PI ? eAngle > sAngle ? 0 : 1 : eAngle > sAngle ? 1 : 0
//     // let largeArcFlag = betweenAngles < PI ? eAngle > sAngle ? 1 : 1 : eAngle > sAngle ? 1 : 0
//     return `M ${gp.startPoint.x} ${gp.startPoint.y} A ${gp.r} ${gp.r}, ${xAxisRoatation},${largeArcFlag} ${sweepFlag}, ${gp.endPoint.x} ${gp.endPoint.y} `
// }

const createArcTwoPointAndRadius = (gp, isNewPath=true) => {
    // 中心点由 参数传进来
    const sAngle = Math.atan2(gp.startPoint.y - gp.centerPoint.y, gp.startPoint.x - gp.centerPoint.x)
    // 求结束角
    const eAngle = Math.atan2(gp.endPoint.y - gp.centerPoint.y, gp.endPoint.x - gp.centerPoint.y)
    // 求夹角
    const xAxisRoatation = 0 // x 轴不旋转, 因为是圆形, 转不转都一样
    const PI = Math.PI
    const betweenAngles = eAngle - sAngle
    let largeArcFlag = betweenAngles > PI ? 1 : 0
    let sweepFlag = betweenAngles > PI ? 0 : 1
    // M 是开启新的路径, 调用 这个画圆弧的时候, 要增加一个判断是不是第1个点, 如果是第1个点, 用 M, 如果不是就用 L
    const operator = isNewPath ? 'M' : 'L'
    // let largeArcFlag = betweenAngles < PI ? eAngle > sAngle ? 1 : 1 : eAngle > sAngle ? 1 : 0
    return `${operator} ${gp.startPoint.x} ${gp.startPoint.y} A ${gp.r} ${gp.r}, ${xAxisRoatation},${largeArcFlag} ${sweepFlag}, ${gp.endPoint.x} ${gp.endPoint.y} `
}


const createArcByAngleAndCenter = (centerPoint, r, sAngle, eAngle, phi = -Math.PI / 2) => {
    // 根据中心点, 半径, 起始角, 结束角生成圆弧
    const xAxisRoatation = 0 // x 轴不旋转, 因为是圆形, 转不转都一样
    const PI = Math.PI
    
    const betweenAngles = Math.abs(eAngle - sAngle)
    let sweepFlag = 1 // 只取顺时针
    let largeArcFlag = betweenAngles < PI ? eAngle > sAngle ? 0 : 1 : eAngle > sAngle ? 1 : 0
    
    const startPoint = { x: centerPoint.x + r * Math.cos(sAngle), y: centerPoint.y + r * Math.sin(sAngle) }
    const endPoint = { x: centerPoint.x + r * Math.cos(eAngle), y: centerPoint.y + r * Math.sin(eAngle) }
    const sp = rotationPoints(startPoint, centerPoint, phi)
    const ep = rotationPoints(endPoint, centerPoint, phi)
    // 根据起始角计算开始点坐标,将这个起始点 旋转 -90°, 初始化时让其从12点钟的方向开始
    // const sp = rotateWhichPoint(cx, cy, { x: cx + r * Math.cos(sAngle), y: cy + r * Math.sin(sAngle) }, a)
    // const ep = rotateWhichPoint(cx, cy, { x: cx + r * Math.cos(eAngle), y: cy + r * Math.sin(eAngle) }, a)
    return `M ${sp.x} ${sp.y} A${r} ${r}, ${xAxisRoatation} , ${largeArcFlag}, ${sweepFlag}, ${ep.x} ${ep.y} `
}

const createLine = (curve) => {
    return `M ${curve.startPoint.x} ${curve.startPoint.y} L ${curve.endPoint.x} ${curve.endPoint.y} `
}

const makeSinglePath = (curve) => {
    if (!curve.operator) {
        fail("需要指定操作符")
    }
    if (curve.operator === 'A') {
        return createArcTwoPointAndRadius(curve)
    } else if (curve.operator === 'L') {
        // TODO: 画直线的函数还要设计一下
        return createLine(curve)
    } else {
        fail("暂时仅支持直线和圆弧的大写操作符")
    }
}

export {
    createArcTwoPointAndRadius,
    createArcByAngleAndCenter,
    createLine,
    makeSinglePath
}