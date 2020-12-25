import { composeResolvers } from '@graphql-tools/resolvers-composition'

const chats = [
    { id: '1', text: '高圆圆' },
    { id: '2', text: '周芷若' },
    { id: '3', text: '赵敏' },
    { id: '4', text: '贾静雯' },
]

const roleResolver = {
    Query: {
        chat: async (_, { id }) => chats.find(chat => chat.id === id),
        // chats: async () => chats
    }
}

const hasRole = (role) => next => async (root, args, context, info) => {
    // if (!context.currentUser.roles || context.currentUser.roles.includes(role)) {
    //     throw new Error('You are not authorized!');
    // }
    return next(root, args, context, info);
};

// 组合认证和授权
const resolversComposition = {
    "Query.chat": [hasRole('EDITOR')],
}
// 组合解析器, 变量名是过去式
const composedResolvers = composeResolvers(roleResolver, resolversComposition)

export default composedResolvers