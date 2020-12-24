import path from 'path'
import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import bodyParser from 'koa-body'
// https://github.com/apollographql/apollo-server#readme
// https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-koa
import { makeExecutableSchema } from '@graphql-tools/schema';
// 处理静态文件, 静态文件夹一般放是项目文件根目录下的 public
import koaStatic from 'koa-static'
// import Router from '@koa/router'
// import { defaultFieldResolver, GraphQLScalarType } from 'graphql'
// import { Kind } from 'graphql/language'
import { /*  SchemaDirectiveVisitor ,*/ gql } from 'apollo-server'
// 连接 mongodb 数据库
import mongoose from 'mongoose'


const app = new Koa()

import Router from '@koa/router'
import { graphql } from 'graphql';
const router = new Router()

//url 带上复制集
const url = 'mongodb://localhost:27017/test?replicaSet=my_repl'
mongoose.connect(url, { useUnifiedTopology: true }, () => console.log('数据库连接成功!'))
// 错误信息, 绑定错误信息处理, 以便定位错误,
mongoose.connection.on('error', console.error.bind(console, 'mongoDB连接异常'))

const typeDefs = gql `
    # 定义新的指令 directive, 定义语句如下:
    # directive @upper on FIELD_DEFINITION 
    # 定义查询 schema, schema 不能为空
   type Chat {
       id: ID
       text: String
   }

   type Query {
       chat(id: ID): Chat
       chats: [Chat]
   }
`

const chats = [
    { id: '1', text: '高圆圆' },
    { id: '2', text: '周芷若' },
    { id: '3', text: '赵敏' },
    { id: '4', text: '贾静雯' },
]

const resolvers = {
    // Date: DateType, // 定义的标量在 resolvers 里使用
    Query: {
        chat: async (_, { id }) => chats.find(chat => chat.id === id),
        chats: async () => chats
    }
}

const schema = makeExecutableSchema({ typeDefs, resolvers, })
// var schema = buildSchema(`
//   type Query {
//       hello: String
//   }
// `);
// var root = { hello: () => 'Hello world!' }
// console.log(schema)
/*
GraphQLSchema {
    __validationErrors: undefined,
    description: undefined,
    extensions: undefined,
    astNode: undefined,
    extensionASTNodes: [],
    _queryType: Query,
    _mutationType: undefined,
    _subscriptionType: undefined,
    _directives: [@include, @skip, @deprecated, @specifiedBy],
    _typeMap: [Object: null prototype] {
        Chat: Chat,
        ID: ID,
        String: String,
        Query: Query,
        Boolean: Boolean,
        __Schema: __Schema,
        __Type: __Type,
        __TypeKind: __TypeKind,
        __Field: __Field,
        __InputValue: __InputValue,
        __EnumValue: __EnumValue,
        __Directive: __Directive,
        __DirectiveLocation: __DirectiveLocation
    },
    _subTypeMap: [Object: null prototype] {},
    _implementationsMap: [Object: null prototype] {}
}
*/




const chatsQuery = `
    # 与模式定义不同, 模式一般在服务器端使用, 而 查询是类似与客户端, 但结构基本相同
    query {
            chats{
            id
            text
        }
    }
`
const chatQuery = `
    # 与模式定义不同, 模式一般在服务器端使用, 而 查询是类似与客户端, 但结构基本相同
    query($id: ID) {
        chat(id: $id) {
            id
            text
        }
    }
`
// 处理 get 请求
router.get('/chats', async (ctx) => {
    // ! 预期的希望是将这个路由映射到 Query.chats
    // graphql(schema, '{ chats {id, text}}', resolvers.Query.chats).then((response) => {
    //     const chats = response.data.chats
    //     // console.log(response.data.chats)
    //     console.log(chats)
    //     ctx.body = "chats"
    // });
    // ctx.body = "chats"
    // const response = await graphql(schema, '{ chats {id, text}}', resolvers.Query.chats)

    // const response = await graphql(schema, chatsQuery, resolvers.Query.chats)
    const response = await graphql(schema, chatsQuery )
    const res = response.data.chats
    ctx.body = res
})
router.get('/chat/:id', async (ctx) => {
    console.log(typeof ctx.params.id, ctx.params.id)
    const id = ctx.params.id
    const variableValues = { id: id };
    // ! 预期的希望是将这个路由映射到 Query.chat
    // ! `{ chat(id: ${id}) {text}}` 这个与查询的字符串是一样的
    // const response = await graphql(schema, `{ chat(id: ${id}) {text}}`, resolvers.Query.chat)
    // const response = await graphql(schema, `{query($id: ID) chat(id: $id) {text}}`, resolvers.Query.chat, ctx.params)
    // const response = await graphql(schema, chatQuery, resolvers.Query.chat, {id:"2"})
    //! https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsQuery-test.js 第204行代码
    const response = await graphql({ schema, source: chatQuery, variableValues })
    const res = response.data.chat
    console.log(response)
    ctx.body = res
})



const server = new ApolloServer({
    typeDefs,
    resolvers,
    // schemaDirectives: {
    //    typeDefs @后的指令名称: 自定义指令名称
    // }
})
server.applyMiddleware({ app })

// body parser  要在路由注册之前调用
app.use(bodyParser());



const routes = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}
// 批量注册路由
routes(app)


// 在这个目录下的文件都可以通过服务器对外提供服务, 前端项目也会使用这个html文件, 是做为浏览器的入口文件
app.use(koaStatic(path.join(__dirname, '../public'), {
    // https://www.npmjs.com/package/koa-static
    // 配置一些选项 index: '默认起始文件.html'
    index: 'index.html'
}))

app.listen(3000, _ => {
    console.log(`Server is running at http://localhost:3000/graphql`)
})