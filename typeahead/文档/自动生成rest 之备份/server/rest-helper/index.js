// 根据 typeDefs 和 resolvers 文件, 生成 查询函数 和 schema
import { typeDefs } from '../graphql'
import { resolvers } from '../resolvers'
// 以上面 2 个导入的文件作为参数, 生成所需要的 rest 路由
import { graphql } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { fieldQuery } from './helper'

const schema = makeExecutableSchema({ typeDefs, resolvers, })

const addEndPoint = (router) => {
    const definitions = typeDefs.definitions
    const query = definitions.find(definition => definition.name.value === 'Query')
    const fields = query.fields
    fields.forEach(field => {
        const { path, fnBody, getVariable } = fieldQuery(field, definitions)
        return router.all(path, async(ctx) => {
            console.log("path---> ", path)
            console.log("fnBody---> ", 'query' + fnBody)
            console.log("getVariable---> ", getVariable(ctx))
            const response = await graphql({
                schema,
                source: 'query' +fnBody,
                variableValues: getVariable(ctx)
            })
            const res = response.data
            ctx.body = res
        })
    })
}
/*
                    query($id: ID) chat(id: $id) { id text }
const chatQuery = ` query($id: ID) { chat(id: $id) { id text  } }`
const addEndPoint = (router) => {
    const path = '/chat/:id'
    return router.all(path, async (ctx) => {
        const response = await graphql({
            schema, // 查询schema
            source: chatQuery, // 查询的函数
            variableValues: { id: ctx.params.id } // source 的函数参数的实际值
        })
        // console.log(response)
        const res = response.data.chat
        ctx.body = res
    })
}
*/
export { addEndPoint }