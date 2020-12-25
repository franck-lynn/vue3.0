import Router from '@koa/router'
import {addEndPoint} from '../rest-helper'
// 这个是生成 restful 路由
const restRouter = new Router()

addEndPoint(restRouter)

export { restRouter }