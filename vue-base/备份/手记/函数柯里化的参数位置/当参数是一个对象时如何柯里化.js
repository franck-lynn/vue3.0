import { multiply } from 'mathjs'
import { curry, __ } from 'ramda'

const xSymmetricMatrix = () => [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, 1]
]



const multiplyCurry = curry((pt, T) => {
    return multiply([pt.x, pt.y, 1], T)
})

// 传入一个参数, 返回一个函数, 这个函数可以接受一个 pt 对象
const rotateAndMoveMatrixFn = multiplyCurry(__, xSymmetricMatrix())


const r = rotateAndMoveMatrixFn({x: 10, y: 10})
console.log(r)
