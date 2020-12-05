
import {is} from "Ramda";

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

const recursion = (obj) => {
    for (const prop in obj){
        if (!is(Object, obj[prop])) {
            // 处理数据
            console.log(prop)
        } else {
            // 递归调用
            // recursion(obj[prop])
        }
    }
    
}

recursion(obj)