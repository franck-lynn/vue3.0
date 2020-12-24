import path from 'path'
// import Koa from 'koa'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
// import { ApolloServer } from 'apollo-server-koa'
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
import { useSofa, OpenAPI } from 'sofa-api';
// import c2k from 'koa2-connect' // 这个插件不起作用, 报 res.json()错误

// const app = new Koa()
const app = express()
import Router from '@koa/router'
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

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const openApi = OpenAPI({
    schema,
    // info: {
    //     title: 'Example API',
    //     version: '3.0.0',
    // },
})

// ! 用 sofa-api 库在 express 下是可以的, 但是在 koa 下却不行
// https://sofa-api.com/docs/essentials/queries
// https://the-guild.dev/blog/sofa
app.use(
    useSofa({
        schema,
        // async context(ctx){
        //     console.log("ctx---> ", ctx)
        //     return ctx
        // },
        // onRoute(info) {
        //     console.log("info: ", info)
        //     openApi.addRoute(info, {
        //         basePath: '',
        //     })
        // }
        onRoute: (info) => {
            console.log("info: ", info)
            // 
            openApi.addRoute(info, {
                basePath: '',
            })
        }
    })
)

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