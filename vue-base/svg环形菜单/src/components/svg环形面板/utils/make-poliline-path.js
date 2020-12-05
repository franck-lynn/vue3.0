import { fail, rotateMovePoints, getLeftArr, createArcTwoPointAndRadius } from '.'
import { pluck } from "ramda";
const makePolilinePath = (pts) => {
    let isNewPath = false
    let s = ''
    if (pts[0].operator !== "M") fail("第1个点必须是 M")
    for (let i = 0; i < pts.length; i++) {
        let ptsI = pts[i]
        if (ptsI.operator === 'A') {
            isNewPath = i === 0 ? true: false
            s += createArcTwoPointAndRadius(ptsI, isNewPath)
        } else {
            s += ptsI.operator + ' ' + ptsI.x + ' ' + ptsI.y + ' '
        }
    }
    return s
}
// 画单个表针
const singlePin = (pinPoints, centerPoint, angle) => {
    return makePolilinePath(rotateMovePoints(pinPoints, centerPoint, angle))
}

// 获取对应角度的数组, 需要保存激活状态时的对应角度
const getAngles = (arr) => {
    const actives = getLeftArr(pluck('active')(arr)) // 整个数组的切片后再用 getLeftArr 获取激活的序号
    const indexAngle = 2 * Math.PI / arr.length // 分度角
    return actives.map((_, index) => actives[index] * indexAngle)
} 
// 画多个表针, 根据传过来的 data arr 数据
const multiplePins = (pinPoints, centerPoint, angles ) => {
    return angles.map(angle => singlePin(pinPoints, centerPoint, angle))
    // 通过 数组对象提取里面的active 属性
    // const actives = getLeftArr(pluck('active')(arr))

    // const indexAngle = 2 * Math.PI / arr.length // 分度角
    // return actives.map((_, index) => {
    //     const angle = actives[index] * indexAngle
    //     return singlePin(pinPoints, centerPoint, angle)
    // })
}




export {
    makePolilinePath, singlePin, getAngles, multiplePins
}