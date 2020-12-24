import { createApp } from 'vue'
import App from './App.vue'
// import { useI18n } from 'vue-i18n'
import { i18n } from './i18n'
import router from './router'
import { vuerPlugin } from './components/vuer-plugin'

const app = createApp(App)

// 准备翻译的语言环境信息
// const messages = {
//     en: {
//         message: {
//             hello: 'hello world'
//         }
//     },
//     ja: {
//         message: {
//             hello: 'こんにちは、世界'
//         }
//     }
// }

// const i18n = createI18n({
//     // shomething vue-i18n options here ...
//     legacy: false, // you must set `false`, to use Compostion API
//     locale: 'ja', // 设置地区
//     fallbackLocale: 'en', // set fallback locale
//     messages, // 设置地区信息
// })


app.use(i18n)

app.use(router)
app.use(vuerPlugin)


app.mount('#root')