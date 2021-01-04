import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { vuerPlugin } from './components/vuer-plugin'

import "./validate"
// import { defineRule } from './validate'

const app = createApp(App)
// app.use(defineRule)
app.use(router)
app.use(vuerPlugin)

app.mount('#root')