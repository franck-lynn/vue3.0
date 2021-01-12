import cn from '../locales/cn.json5' // 导入默认的语言
import { SUPPORT_LOCALES, setupI18n, setI18nLanguage, loadLocaleMessages } from './i18n'


//! i18n 的初始化
const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    locale: process.env.VUE_APP_I18N_LOCALE || 'cn', // 设置地区, 本地语言
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en', // set fallback locale, 回滚的语言
    messages: {
        cn // 默认的语言包
    }
})

/*
    // 一次性自动加载所有翻译 json5 文件
    // const loadLocaleMessages = () => {
    //     const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json5$/i)
    //     // const locales = require.context('../locales/', true, /\.json5$/i)
    //     const messages = {}
    //     locales.keys().forEach(key => {
    //         const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    //         if (matched && matched.length > 1) {
    //             const locale = matched[1]
    //             // 这里要带上 default 才可以
    //             messages[locale] = locales(key).default
    //         }
    //     })
    //     return messages
    // }
*/

export { i18n, SUPPORT_LOCALES, setupI18n, setI18nLanguage, loadLocaleMessages }