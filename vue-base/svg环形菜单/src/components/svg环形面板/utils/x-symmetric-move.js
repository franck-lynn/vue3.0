import { multiply } from 'mathjs'
import { evolve, has,  isEmpty, mergeRight, zipObj } from 'ramda'
import { xSymmetricMoveMatrix } from "./matrices";

// 对 有 x, y 属性的曲线对象进行翻转平移
const xSymmetricMove = (point, dx, dy) => {
    // 用转动矩阵进行转动
    const T = xSymmetricMoveMatrix(dx, dy)
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
    if (has('x', point) && has('y', point)) {
        root = mergeRight(point, rotationPointFn(point))
    }
    // 如果 root 为 空, 就要用原来的对象
    root = isEmpty(root) ? point : root
    const result = evolve(transformations, root)
    return result
}
const xSymmetricMovePoints = (points, dx, dy) => {
    return points.map(point => xSymmetricMove(point, dx, dy))
}

// // 对 有 x, y 属性的曲线对象进行翻转平移
// const ySymmetricMove = (point, dx, dy) => {
//     // 用转动矩阵进行转动
//     const T = ySymmetricMoveMatrix(dx, dy)
//     const rotationPointFn = (pt) => {
//         return zipObj(['x', 'y'], multiply([pt.x, pt.y, 1], T))
//     }

//     const transformations = {
//         // 有就会运行, 没有就不会运行
//         startPoint: rotationPointFn,
//         centerPoint: rotationPointFn,
//         endPoint: rotationPointFn
//     }
//     let root = {}
//     // 如果对象的根部有 x, y 属性, 就转化这个坐标, 没有就跳过
//     if (has('x', point) && has('y', point)) {
//         root = mergeRight(point, rotationPointFn(point))
//     }
//     // 如果 root 为 空, 就要用原来的对象
//     root = isEmpty(root) ? point : root
//     const result = evolve(transformations, root)
//     return result
// }
// const ySymmetricMovePoints = (points, dx, dy) => {
//     return points.map(point => ySymmetricMove(point, dx, dy))
// }


export { xSymmetricMovePoints }
