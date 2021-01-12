import path from 'path'

//! 获取支持的语言
const supportLocales = () => {
    const langs = []
    let files
    let locales
    try {
        files = require.context('@/locales/', true, /\.json5$/)
        locales = files.keys()
    } catch (error) {
        throw new Error('获取语言包失败')
    }

    locales.forEach(key => {
        // const module = files(key).default
        // console.log("有哪些语言包? ", path.basename(key, '.json5'))
        langs.push(path.basename(key, '.json5'))
    })
    return langs
}
export { supportLocales }

// import path from 'path'
// import { readfiles } from '../utils'
// // 搜索 locales 文件夹下的翻译 json5 文件, 看看支持哪些语言
// // 只有获取文件名就可以了, 这个可以获取文件名, 但是 webpack 用不了
// const supportLocales = () => {
//     const filepath = path.resolve(__dirname, '../locales')
//     const files = readfiles(filepath)
//     return files.map(file => {
//         // locales 文件夹下只要是 json5 文件就认为是 翻译文件
//         return path.basename(file, '.json5')
//     })
// }
// export { supportLocales }