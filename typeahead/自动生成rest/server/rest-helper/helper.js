const baseTypes = [
    'Number', 'number', 'Int', 'int', 'Float', 'float',
    'Symbol', 'symbol', 'String', 'string', 'Boolean',
    'boolean', 'undefined', 'Undefined', 'null', 'Null',
    'ID', 'Id', 'id', '_ID', '_Id', '_id'
]
// 判断是不是基本数据类型
const isBaseType = (x) => baseTypes.includes(x)

// TODO: take 功能未实现
// TODO: 实现蹦床函数
// TODO: 图算法优化的实现
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
// 设计一个函数, 参数是 typeDefs 里的 query 元素下的字段(函数)
const getArgs = field => {
    const args = field.arguments
    let sArgs = '' // 函数的参数
    let sArgsArr = [] // 函数参数的数组表示
    let vArgs = '' // 变量参数
    let pArgs = '' // 路径参数
    for (let i = 0; i < args.length; i++) {
        // 如果有函数参数, 则进行转化字符串工作
        if (args[i] && args[i].name && args[i].name.value) {
            sArgs = sArgs + args[i].name.value + ': ' + '$' + args[i].name.value + ' ' // 形如 chat(id: $id), 函数的参数
            if (args[i] && args[i].type && args[i].type.name && args[i].type.name.value) {
                vArgs = vArgs + '$' + args[i].name.value + ': ' + args[i].type.name.value + ' ' // 形如 cquery($id: ID), 变量参数
            }
            pArgs = pArgs + '/:' + args[i].name.value //  形如 path = '/chat/:id', 路径参数
            sArgsArr.push(args[i].name.value) // 为变量参数赋值准备的参数数组
        }
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
    let fn
    if (field && field.name && field.name.value) {
        fn = field.name.value
        // TODO: 驼峰转连字符
    } else {
        throw new Error('您没有定义需要的函数')
    }
    let returnType
    if (field && field.type && field.type) {
        if (field.type.name && field.type.name.value) {
            returnType = field.type.name.value
        } else if (field.type.type.name && field.type.type.name.value) {

            returnType = field.type.type.name.value
            // console.log("返回值类型----> ", returnType)
        }
    } else {
        throw new Error('您没有定义返回值的类型')
    }
    const returnValue = returnFields(definitions, returnType)
    let fnBody
    if (vArgs && sArgs) {
        fnBody = '(' + vArgs + ') {' + fn + '(' + sArgs + ')' + returnValue + '}'
    } else {
        fnBody = '{' + fn + returnValue + '}'
    }

    const path = '/' + fn + pArgs
    const getVariable = (ctx) => {
        let target = {}
        if (sArgsArr && Array.isArray(sArgsArr) && sArgsArr.length > 0) {
            // console.log("请求参数数组: ", sArgsArr)
            for (const item of sArgsArr) {
                Reflect.set(target, item, ctx.params[item])
            }
            return target
        } else {
            return null
        }

    }
    return { path, fnBody, getVariable }
}

export { fieldQuery }