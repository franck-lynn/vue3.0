// 函数返回值的递归
// 在 构造 query 的函数中, 其返回值有可能是一个层级结构, 这个时候, 
// 需要按照层级递归出所有基本的字段, 还要按照传递的参数进行选择, 
// 权限的判断最好是由 graphql 来处理, 不然, 显得非常复杂了
// import { isNil } from "ramda";
// const existy = x => x != null
// const truthy = x => (x !== false) && existy(x)

// 把 graphql 中认为是基本的数据类型
const baseTypes = ['Number', 'number', 'Int', 'int', 'Float', 'float', 'Symbol', 'symbol', 'String', 'string', 'Boolean', 'boolean', 'undefined', 'Undefined', 'null', 'Null', 'ID', 'Id', 'id', '_ID', '_Id', '_id']
// 判断是不是基本数据类型
const isBaseType = (x) => baseTypes.includes(x)

import { typeDefs } from '../graphql'

// take 功能未实现
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
            //! 1-3. 遍历 Chat 类型 下的字段
            //! 3-3. Info 有 2 个字段, 遍历这2个字段
            for (let i = 0; i < theType.fields.length; i++) {
                // 循环体展开返回值自定义类型下面的所有字段, take 数组保持与 theType.fields 相同的结构
                //! 1-4. 字段的名称, 第1个是 id, ∴ value = id
                //! 2-1. 第2个字段是 text, ∴ value = text
                //! 3-1. 第3给字段是 info, ∴ value = info
                //! 3-4. 递归, 第1个字段是 email
                let value = ' ' + theType.fields[i].name.value + ' ' // 保存这个字段的名称, 前后都加空格
                // console.log("字段名--> ", value)
                // theType.fields[i].type.value 是基本数据类型, 则这个属性有, 非基本数组类型是theType.fields[i].type.type.name.value
                //! 1-5. 判断 id 的类型, 是基本的数据类型 
                //! 2-2. 判断 text 的类型, 是基本的数据类型 
                if (theType.fields[i].type.name && isBaseType(theType.fields[i].type.name.value)) {
                    // 如果是基本数据类型
                    if (i === 0) { // 第1条数据
                        //! 1-6. 判断是第1条数据, ∵ value = id, ∴ value = { id
                        // 如果只有一条数据, 就用 右括号封闭.
                        value = i === theType.fields.length - 1 ? '{ ' + value + ' }' : '{ ' + value
                    } else if (i === theType.fields.length - 1) {
                        value = value + '}' // .repeat(deep + 1)
                    }
                    //! 1-7. str = { id. 循环第1次结束
                    //! 2-3. text 既不是第1条数据, 也不是最后一条数据, str = { id text . 循环第2次结束
                    str = str + value
                    // value = null 
                } else {
                    //! 3-2. info 数据走递归, prev = info, str = { id. text
                    prev = value
                    // returnFields(definitions, theType.fields[i].type.type.name.value, take, str = str + prev, prev, deep + 1)
                    // str = returnFields(definitions, theType.fields[i].type.type.name.value, take, str = str + prev, prev, deep + 1)


                    if (i === 0) {
                        // TODO: 
                        str = str + '{' + prev + returnFields(definitions, theType.fields[i].type.type.name.value, take, str = '', prev, deep + 1)
                        // returnFields(definitions, theType.fields[i].type.type.name.value, take, str = str + '{' + prev, prev, deep + 1)
                        // str = i === str && theType.fields.length - 1 ? '{ ' + str + ' }' : '{ ' + str
                        // return returnFields(definitions, theType.fields[i].type.type.name.value, take, str = str + prev, prev, deep + 1)
                    } else if (i === theType.fields.length - 1) {
                        //! 3-3. 判断 info 是非基本数据类型, 走递归, 是第3个, 同时也是最后一个 str = { id text , value = info
                        // returnFields(definitions, theType.fields[i].type.type.name.value, take, str, prev, deep + 1) + '}'
                        str = str + prev + returnFields(definitions, theType.fields[i].type.type.name.value, take, str = '', prev, deep + 1) + '}'
                        // returnFields(definitions, theType.fields[i].type.type.name.value, take, str = str + prev, prev, deep + 1)
                    } else {
                        str = str + prev + returnFields(definitions, theType.fields[i].type.type.name.value, take, str = '', prev, deep + 1)
                        // return returnFields(definitions, theType.fields[i].type.type.name.value, take, str = str + prev, prev, deep + 1)
                    }
                }
            }
        }
    }
    return str
}
// console.log(returnFields(typeDefs.definitions, 'Chat'))

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
        if(args[i] && args[i].name && args[i].name.value){
            sArgs = sArgs + args[i].name.value + ': ' + '$' + args[i].name.value + ' ' // 形如 chat(id: $id), 函数的参数
            if (args[i] && args[i].type && args[i].type.name && args[i].type.name.value){
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
    if (field && field.name && field.name.value){
        fn = field.name.value
        // TODO: 驼峰转连字符
    }else{
        throw new Error('您没有定义需要的函数')
    }
    let returnType  
    if (field && field.type && field.type.name && field.type.name.value){
        returnType = field.type.name.value
    }else{
        throw new Error('您没有定义返回值的类型')
    }
    // console.log(returnType)
    const returnValue = returnFields(definitions, returnType)
    const fnBody = '(' + vArgs + ')' + fn + '(' + sArgs + ')' + returnValue
    
    const path = '/' + fn + pArgs
    const getVariable = (ctx) => {
        if (sArgsArr && Array.isArray(sArgs)){
             return sArgsArr.map(item => ({ item: ctx.params[item] }))
        }else{
            return null
        }
    }
    console.log(path)
    console.log(fnBody)
    console.log(getVariable)
    return { path, fnBody, getVariable }
}



// 设计一个函数, 函数的名称是请求字符串, 参数 是 请求参数 ctx.params, 函数的返回值是 请求对象 ctx.query
const fn = (definitions) => {
    // 返回数组中定义的 query 元素
    const query = definitions.find(definition => definition.name.value === 'Query')
    // console.log("query---> ", query)
    const fields = query.fields
    for (let i = 0; i < fields.length; i++) {
        fieldQuery(fields[i], definitions)
    }
    // return fields
}

// fn(typeDefs.definitions)