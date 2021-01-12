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