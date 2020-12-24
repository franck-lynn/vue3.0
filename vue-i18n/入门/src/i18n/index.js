import cn from './cn.json5'
import en from './en.json5'
import { createI18n } from 'vue-i18n'
// http://kazupon.github.io/vue-i18n/zh/introduction.html
// https://vue-i18n-next.intlify.dev/
const messages = {
    cn,
    en
}
const datetimeFormats = {
    cn: {
        long: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }
    }, 
    en: {
        long: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }
    }, 
}

const i18n = createI18n({
    // shomething vue-i18n options here ...
    legacy: false, // you must set `false`, to use Compostion API
    // 设置全局属性, 并使用 $t 翻译而不是 t,  这样就可以不必在每个组件中导入
    // const { t } = useI18n() 之类的了, 官方建议还是采用 
    // 更改为setup使用useI18nwithuseScope: 'global'选项返回的安装上下文的属性或功能
    globalInjection: true,
    locale: 'cn', // 设置地区
    fallbackLocale: 'en', // set fallback locale
    messages, // 设置地区信息
    datetimeFormats
})

export { i18n }