import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import router from './router'
import { vuerPlugin } from './components/vuer-plugin'

import "./validate";

// import { defineRule, configure } from "vee-validate";
// import { defineRule as rules} from './validate'
// // import * as rules from "@vee-validate/rules";

// // Make the validat aggressive to show case validators
// configure({
//     validateOnInput: true
// });

// // Install all rules
// Object.keys(rules).forEach((rule) => {
//     defineRule(rule, rules[rule]);
// });

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(vuerPlugin)

app.mount('#root')