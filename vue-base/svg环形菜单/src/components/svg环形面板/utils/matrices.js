import { sin, cos, multiply } from 'mathjs'


// 旋转辅助函数
const unitMatrix = [ // 单位矩阵
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]
// 1.平移矩阵
const moveMatrix = (dx, dy) => [
    [1, 0, 0],
    [0, 1, 0],
    [dx, dy, 1]
]
// 2. 旋转矩阵函数
const rotationMatrix = (theta) => [
    [cos(theta), sin(theta), 0],
    [-sin(theta), cos(theta), 0],
    [0, 0, 1]
]
// 3. 绕任意点旋转的矩阵
const rotationPointMatrix = (rotationPoint, rotationAngle) => {
    const T1 = moveMatrix(-rotationPoint.x, -rotationPoint.y) // 移动到旋转点
    const T2 = rotationMatrix(rotationAngle)
    const T3 = moveMatrix(rotationPoint.x, rotationPoint.y) // 移动到旋转点
    return [T1, T2, T3].reduce((prev, current) => multiply(prev, current), unitMatrix)
}

// 关于 x 对称的矩阵
const xSymmetricMatrix = () => [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, 1]
]
// 关于 y 对称的矩阵
// const ySymmetricMatrix = () => [
//     [-1, 0, 0],
//     [0, 1, 0],
//     [0, 0, 1]
// ]
const xSymmetricMoveMatrix = (dx, dy) => {
    const T1 = xSymmetricMatrix()
    const T2 = moveMatrix(dx, dy)
    return [T1, T2].reduce((prev, current) => multiply(prev, current), unitMatrix)
}
// const ySymmetricMoveMatrix = (dx, dy) => {
//     const T1 = ySymmetricMatrix()
//     const T2 = moveMatrix(dx, dy)
//     return [T1, T2].reduce((prev, current) => multiply(prev, current), unitMatrix)
// }

// 旋转和移动矩阵 
const rotationMoveMatrix = (rotationAndMovePoint, rotationAngle) => {
    const T1 = moveMatrix(rotationAndMovePoint.x, rotationAndMovePoint.y)
    const T2 = rotationPointMatrix(rotationAndMovePoint, rotationAngle)
    return [T1, T2].reduce((prev, current) => multiply(prev, current), unitMatrix)
}

export {
    rotationPointMatrix,
    moveMatrix,
    xSymmetricMoveMatrix,
    rotationMoveMatrix
}