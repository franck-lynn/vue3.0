import cn from '../locales/cn.json5' // 导入默认的语言
import { SUPPORT_LOCALES, setupI18n, setI18nLanguage, loadLocaleMessages } from './i18n'

//! i18n 的初始化, 默认的语言是简体中文, 英文简称 cn
const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    locale: process.env.VUE_APP_I18N_LOCALE || 'cn', // 设置地区, 本地语言
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'cn', // set fallback locale, 回滚的语言
    messages: {
        cn // 默认的语言包
    }
})

export { i18n, SUPPORT_LOCALES, setupI18n, setI18nLanguage, loadLocaleMessages }