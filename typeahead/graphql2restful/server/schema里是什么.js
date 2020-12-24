
import { makeExecutableSchema } from '@graphql-tools/schema';
import { /*  SchemaDirectiveVisitor ,*/ gql } from 'apollo-server'

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




console.log(schema)