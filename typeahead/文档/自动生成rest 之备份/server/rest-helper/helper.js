
const baseTypes = ['Number', 'number', 'Int', 'int', 'Float', 'float', 'Symbol', 'symbol', 'String', 'string', 'Boolean', 'boolean', 'undefined', 'Undefined', 'null', 'Null', 'ID', 'Id', 'id', '_ID', '_Id', '_id']
// 判断是不是基本数据类型
const isBaseType = (x) => baseTypes.includes(x)

// TODO: take 功能未实现
// TODO: 实现蹦床函数
const returnFields = (definitions, returnType, take, str = '', prev, deep = 0) => {
    //! 1-1. 传入 Chat 类型
    // definitions 是typeDefs.definitions 的整个数组, returnType 是指定的返回值类型
    if (isBaseType(returnType)) {
        // 如果是基本的数据类型, 就直接返回所需要的格式
        str = '{' + returnType + '}'
    } else { // 如果不是基本的数据类型, 就进入这个分支
        //不是基本数据类型, 就在 definitions 整个数组中查找这个自定义的对象(复杂,非基本)类型
        //! 1-2. 找到 Chat 类型所在的元素
        const theType = definitions.find(element => element.name.value === returnType)

        // 找到了这个类型, 并且这个自定义的对象类型下面有字段数组才处理.
        // 如果没有这个自定义的对象类型或者下面没有字段数组, 说明 graphql schema 定义不完全, 交给 graphql 去处理 
        if (theType && theType.fields) {
            // 下面分析函数返回值的字段类型, 直到每个都是基本类型
            for (let i = 0; i < theType.fields.length; i++) {
                // 循环体展开返回值自定义类型下面的所有字段, take 数组保持与 theType.fields 相同的结构
                let value = ' ' + theType.fields[i].name.value + ' ' // 保存这个字段的名称, 前后都加空格
                // console.log("字段名--> ", value)
                // theType.fields[i].type.value 是基本数据类型, 则这个属性有, 非基本数组类型是theType.fields[i].type.type.name.value
                if (theType.fields[i].type.name && isBaseType(theType.fields[i].type.name.value)) {
                    // 如果是基本数据类型
                    if (i === 0) { // 第1条数据
                        // 如果只有一条数据, 就用 右括号封闭.
                        value = i === theType.fields.length - 1 ? '{ ' + value + ' }' : '{ ' + value
                    } else if (i === theType.fields.length - 1) {
                        value = value + '}' // .repeat(deep + 1)
                    }
                    str = str + value
                    // value = null 
                } else {
                    prev = value
                    if (i === 0) {
                        str = str + '{' + prev + returnFields(definitions, theType.fields[i].type.type.name.value, take, str = '', prev, deep + 1)
                    } else if (i === theType.fields.length - 1) {
                        str = str + prev + returnFields(definitions, theType.fields[i].type.type.name.value, take, str = '', prev, deep + 1) + '}'
                    } else {
                        str = str + prev + returnFields(definitions, theType.fields[i].type.type.name.value, take, str = '', prev, deep + 1)
                    }
                }
            }
        }
    }
    return str
}


// 当前端调用如下接口时:
// http://localhost:3000/chat/2
// 设计一个函数, 参数是 typeDefs 里的 query 元素下的字段
const getArgs = field => {
    const args = field.arguments
    let sArgs = ''
    let sArgsArr = []
    let vArgs = ''
    let pArgs = ''
    for (let i = 0; i < args.length; i++) {
        sArgs = sArgs + args[i].name.value + ': ' + '$' + args[i].name.value + ' '
        vArgs = vArgs + '$' + args[i].name.value + ': ' + args[i].type.name.value + ' '
        pArgs = pArgs + '/:' + args[i].name.value
        sArgsArr.push(args[i].name.value)
    }
    return { sArgs, vArgs, pArgs, sArgsArr }
}

const fieldQuery = (field, definitions) => {
    const args = getArgs(field)
    let vArgs = args.vArgs
    let sArgs = args.sArgs
    let pArgs = args.pArgs
    let sArgsArr = args.sArgsArr
    // 函数的名称
    const fn = field.name.value
    const returnType = field.type.name.value
    // console.log(returnType)
    const returnValue = returnFields(definitions, returnType)
    // fn 到最后 之间 要用 {} 括起来
    const fnBody = '(' + vArgs + ') {' + fn + '(' + sArgs + ')' + returnValue + '}'
    const path = '/' + fn + pArgs
    const getVariable = (ctx) => {
        const target = {}
        // return sArgsArr.map(item => ({ [item]: ctx.params[item] }))
        for (const item of sArgsArr) {
            Reflect.set(target, item, ctx.params[item])
        }
        return target
    }
    
    return { path, fnBody, getVariable }
}

export { fieldQuery }