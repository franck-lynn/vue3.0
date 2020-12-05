import path from 'path'
// import glob from 'glob'
import walk from '../components/walk-vue';
// 完整的使用Vue3重构vue2项目
// https://my.oschina.net/yangshuoyunhai/blog/4682869
// 可以换成 globby , fast-glob, /**/*.xx/ 可以递归子文件夹
// const files = glob.sync(__dirname + '/**/*.vue')
const files = walk(__dirname)
// let components = []
// files.keys().forEach(key => {
//     components = components.concat(files(key).default)
// })
const getFilename = (filepath = () => { throw new Error }) => {
    let basename = path.win32.basename(filepath)
    let extname = path.extname(filepath)
    return basename.substring(0, basename.indexOf(extname))
}
// const vuerPlugin = {
//     install(app) {
//         components.forEach(item => app.component(item.name, item))
//     }
// }
const vuerPlugin = {
    install(app) {
        files.forEach(filepath => {
            app.component(getFilename(filepath), filepath)
        })
    }
}
export { vuerPlugin }