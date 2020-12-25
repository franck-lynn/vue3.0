// 根据 typeDefs 和 resolvers 文件, 生成 查询函数 和 schema
import { typeDefs } from '../graphql'
import { resolvers } from '../resolvers'
// 以上面 2 个导入的文件作为参数, 生成所需要的 rest 路由
import { graphql } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { fieldQuery } from './helper'

const schema = makeExecutableSchema({ typeDefs, resolvers, })
/**
 * rest api 与 graphql api 是一致的, 为保持这种一致性及使用方便, 
 * graphql 得受到一定得限制, 例如: 函数得输入参数最好基本类型.
 * 也不要有层级得结构. 函数参数与变量参数一致, 函数参数与变量参数
 * 可以没有.
 * 返回值可以是层级结构, 
 * 查询字符串结构一般形如: `query($id: ID) { chat(id: $id) { id text  } }`
 * 查询字符串结构一般形如: `query { chats { id text  } }`
 * 路由路径一般形如: path = '/chat/:id' 冒号后是路由参数, 作为函数的输入参数,  
 * 问号 后是字段, 作为函数的返回值
 * @param {*} router 路由对象
 * 本函数自动生成 rest api 接口
 * 使用时只要在 路由 routes 目录下的一个路由对象文件中
 * addEndPoint(restRouter),  restRouter 是具体路由对象
 * 即可. 所有定义的 graphql api 均可自动生成 rest api 接口
 */
/*
TODO: 1. 测试没有参数的情况
TODO: 2, 测试1个参数的情况
TODO: 3. 测试2个参数的情况
TODO: 4. 返回值是 基本类型 1个, 2个, 多个
TODO: 5. 返回值是 对象类型, 1个, 2个, 多个
TODO: 6. 返回值是 基本类型和对象类型组合, 对象在前, 在后, 在中件, 有1个, 2个对象返回值
TODO: 7. 有返回值的情况, 没有返回值的情况
TODO: 8. 查询错误的情况
TODO: 9. 查询返回字段的情况
TODO: 10. post 提交情况
TODO: 11. 权限处理
TODO: 12. 错误处理
 */
const addEndPoint = (router) => {
    const definitions = typeDefs.definitions
    const operators = ['Query', 'Mutation']
    let operator, fields
    for (let i = 0; i < definitions.length; i++) {
        // 只对 操作符是 Query 和 Mutation 两种情况进行处理, 包含这两种操作符的图形形状提取出来
        if (definitions[i].name && operators.includes(definitions[i].name.value)) {
            // 操作符的首字母要小写的
            operator = definitions[i].name.value.toLowerCase()
            // Query 或者 Mutation 下字段是操作函数定义 fields
            fields = definitions[i].fields
            fields.forEach(field => {
                // fields下字段定义的函数需要有如下一些信息:
                // 1. path 是给路由用的路径, fnBody 是函数体, getVariable 是给函数参数赋值
                // 2. path=/函数名称/:路由参数1/:路由参数2/:.../?field1=xxxx&&field2=xxxx&&... 
                // 3. fnBody=  `query($id: ID) { chat(id: $id) { id text  } }`
                // 4. fnBody=  `query { chats { id text  } }`
                // 5. getVariable(ctx) 返回的是一个对象, 形状 {id: 'xxx', key: 'value'}
                //    其中 key 是函数返回值的字段, value 是 路由参数 :冒号后面值传过来的
                const { path, fnBody, getVariable } = fieldQuery(field, definitions)
                return router.all(path, async (ctx /*, next */ ) => {
                    let response
                    try {
                        // 发送 graphql 请求, 问 graphql 要数据
                        // TODO: 是不是和 resolver和graphql 是关联的? 如果字段上有权限指令, 是 报错 还是 取不到 还是 取得到?
                        // TODO: 有待测试
                        // TODO: 是否可以根据不同的请求, 对参数进行不同的处理?
                        // console.log('判断是get请求还是post请求: ', ctx.method)
                        response = await graphql({
                            schema, // 整个应用就只有这一个 schema
                            source: operator + fnBody, // 根据定义的函数不同生成不同的函数字符串
                            variableValues: getVariable(ctx)
                        })
                    } catch (e) {
                        throw new Error(e)
                    }
                    ctx.body = response.data
                    // next()
                })
            })
        }
    }
}

export { addEndPoint }