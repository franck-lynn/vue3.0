
// import '../scss/main.scss' // 导入的是变量文件
// 上述全部变量改为在 webpack.config.js (测试环境配置) 里进行配置
import '../scss/shared.scss' // 导入的是图标文件


import VuerButton from './button/button.vue'
// import VuerCheckbox from './checkbox/checkbox.vue'
// import VuerCheckboxGroup from './checkbox/checkbox-group.vue'
// import VuerDialog from './dialog/dialog.vue'
// import VuerForm from './form/form.vue'
// import VuerFormItem from './form/form-item.vue'
// import VuerInput from './input/input.vue'
// import VuerRadio from './radio/radio.vue'
// import VuerRadioGroup from './radio/radio-group.vue'
// import VuerSwitch from './switch/switch.vue'
// import VuerProgressBar from './progress-bar/progress-bar.vue'
import VuerProgressBarStep from './progress-bar/progress-bar-step.vue'


const components = [
     VuerButton, /* VuerCheckbox, VuerCheckboxGroup, VuerDialog,
    VuerForm, VuerFormItem, VuerInput, VuerRadio, VuerRadioGroup, VuerSwitch, VuerProgressBar, */ VuerProgressBarStep
]
// 批量注册
// let components = []
// files.keys().forEach(key => {
//     components = components.concat(files(key).default)
// })

// 注册组件
const vuerPlugin = {
    install(app) {
        components.forEach(item => app.component(item.name, item))
    }
}


export { vuerPlugin }