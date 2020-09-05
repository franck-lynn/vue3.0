import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { vuerPlugin } from '@franck-lynn/vuer-ui'

const app = createApp(App)
app.use(router)
app.use(vuerPlugin)

app.mount('#root')