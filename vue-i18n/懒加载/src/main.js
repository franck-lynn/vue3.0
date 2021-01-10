import { createApp } from 'vue'
import App from './App.vue'
// 导入 i18n 的实例
import { i18n } from './i18n'
import router from './router'
import { vuerPlugin } from './components/vuer-plugin'

const app = createApp(App)

app.use(i18n)

app.use(router)
app.use(vuerPlugin)
app.mount('#root')