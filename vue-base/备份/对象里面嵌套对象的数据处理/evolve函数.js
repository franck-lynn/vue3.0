import { evolve, has, mergeRight } from "Ramda";
const obj = {
    operate: 'A',
    x: 0,
    y: 0,
    centerPoint: {
        x: 0,
        y: 0,
    },
    r: 120,
    startPoint: {
        x: 100,
        y: 100,
    },
    endPoint: {
        x: 200,
        y: 200,
    }
}


const obj2 = { operate: 'M', x: 4, y: 5 }


const evolveObj = (obj) => {
    // 函数的参数是接受一个对象
    const machinePt = pt => {
        return {
            x: pt.x * 10 + 1,
            y: pt.y * 10 + 1
        }
    }
    const transformations = {
        centerPoint: machinePt,
        startPoint: machinePt,
        endPoint: machinePt
    }
    // 如果 obj 根部有 x, y 属性, 就先处理这个属性
    let root = {}
    if (has('x', obj) && has('y', obj)) {
        root = mergeRight(obj, machinePt(obj))
    }

    const r = evolve(transformations, root)

    console.log(r)
}


evolveObj(obj2)