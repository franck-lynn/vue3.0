import { curry, __ } from "ramda"

/*
 要生成一个矩阵, 
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
const createMatrix = (a, b, p, c, d, q, l, m, s) => [
    [a, b, p],
    [c, d, q],
    [l, m, s]
]
// 柯里化
const createMatrixCurry = curry(createMatrix)
// 生成平移矩阵的函数
const moveMatrixFn = createMatrixCurry(
    1, 0, 0,
    0, 1, 0,
    __, __, 1
)

// 生成平移矩阵
const move = moveMatrixFn('dx', 'dy')

console.log("是否可以生成平移矩阵? ", move)

// const addFourNumbers = (a, b, c, d) => (a + b) * c + d;
// const curriedAddFourNumbers = curry(addFourNumbers);
// const f = curriedAddFourNumbers(__, __, 3, 4) // (a+b) * 3 + 4
// const g = f(3) // (3+b) * 3 + 4
// console.log(g(4)) // (3+4) * 3 + 4