import { createI18n } from 'vue-i18n'

// 自动加载 翻译 json5 文件
const loadLocaleMessages = () => {
    const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json5$/i)
    // const locales = require.context('../locales/', true, /\.json5$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            // 这里要带上 default 才可以
            messages[locale] = locales(key).default
        }
    })
    
    return messages
}

const i18n = createI18n({
    // shomething vue-i18n options here ...
    legacy: false, // you must set `false`, to use Compostion API
    // 设置全局属性, 并使用 $t 翻译而不是 t,  这样就可以不必在每个组件中导入
    // const { t } = useI18n() 之类的了, 官方建议还是采用 
    // 更改为setup使用useI18nwithuseScope: 'global'选项返回的安装上下文的属性或功能
    globalInjection: true,
    locale: process.env.VUE_APP_I18N_LOCALE || 'cn', // 设置地区
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en', // set fallback locale
    messages: loadLocaleMessages(), // 设置地区信息
    // datetimeFormats
})

export { i18n }