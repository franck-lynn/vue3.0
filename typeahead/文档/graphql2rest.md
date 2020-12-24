## 将现有的 Graphql API 转换成 rest

由于 twitter typeahead.js 的api 比较老, 但是性能比较好, 还是想使用一下, 

遇到的问题是与现有的 apollo-server-koa 和 koa-router 的api不能匹配.

#### 尝试解决这个问题, 刚开始选择 的是 

npm uninstall graphql2rest
https://github.com/sisense/graphql2rest

这个也是不好匹配

#### 另一种选择

https://github.com/Urigo/SOFA
npm install sofa-api --save
https://the-guild.dev/blog/sofa
sofa 文档
https://sofa-api.com/docs/

npm uninstall graphql2rest
https://github.com/sisense/graphql2rest

如何使用GraphQL包装REST API-3步教程
https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d

这个同样是基于express的, 不支持 koa, 我要的是支持 koa

## 参照下面的文章, 自己实现

现有的GraphQL API转换为REST
https://stackoverflow.com/questions/43020235/proxy-convert-existing-graphql-api-to-rest
https://github.com/remind101/rest-graphql/tree/master/src

```
router.get('/chats', async (ctx) => {

  // ! 预期的希望是将这个路由映射到 Query.chats

  // graphql(schema, '{ chats {id, text}}', resolvers.Query.chats).then((response) => {

  //   const chats = response.data.chats

  //   // console.log(response.data.chats)

  //   console.log(chats)

  //   ctx.body = "chats"

  // });

  // ctx.body = "chats"

  //! 这里实现了要求, 但是总感觉有点怪怪的
  const response = await graphql(schema, '{ chats {id, text}}', resolvers.Query.chats)

  const res = response.data.chats

  ctx.body = res

})
```
https://www.apiscene.io/graphql/graphql-api-or-rest-api-why-not-have-both/

https://github.com/chentsulin/awesome-graphql#lib-js
https://graphql.org/community/













