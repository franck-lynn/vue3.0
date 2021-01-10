import { createApp } from 'vue'
import App from './App.vue'
// 国际化
// import { i18n } from './i18n'

import router from './router'
import { vuerPlugin } from './components/vuer-plugin'

const app = createApp(App)
// app.use(i18n)
app.use(router)
app.use(vuerPlugin)
app.mount('#root')