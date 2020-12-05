import path from 'path'
// import glob from 'glob'
import walk from '../components/walk-vue';
import { createRouter, createWebHashHistory } from 'vue-router'

// 可以换成 globby , fast-glob, /**/*.xx/ 可以递归子文件夹
// const files = glob.sync(__dirname + '/**/*.vue')
const files = walk(__dirname)

const getFilename = (filepath = () => { throw new Error }) => {
    let basename = path.win32.basename(filepath)
    let extname = path.extname(filepath)
    return basename.substring(0, basename.indexOf(extname))
}

let routes = []
//! 约定:
// //? 所有 vue 文件都按照模板的 default 导出
// //? 文件名称与 vue 中的 name 属性相同, 这样就可以根据 name 属性 取出文件名
files.forEach(filepath => {
    routes = routes.concat({
        path: filepath,
        name: getFilename(filepath),
        component: filepath
    })
})
// // 配置一个默认的路由
const defaultRoute = {
    path: '/',
    component: () => import('@/components/index.vue')
}
routes.push(defaultRoute)


const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router