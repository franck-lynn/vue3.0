import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {vuerPlugin} from '../packages'

const app = createApp(App)

app.use(vuerPlugin)
app.use(router)
app.mount('#root')