import VuerButton from '@/components/button/button.vue'
import VuerCheckbox from '@/components/checkbox/checkbox.vue'
import VuerCheckboxGroup from '@/components/checkbox/checkbox-group.vue'
import VuerDialog from '@/components/dialog/dialog.vue'
import VuerForm from '@/components/form/form.vue'
import VuerFormItem from '@/components/form/form-item.vue'
import VuerInput from '@/components/input/input.vue'
import VuerRadio from '@/components/radio/radio.vue'
import VuerRadioGroup from '@/components/radio/radio-group.vue'
import VuerSwitch from '@/components/switch/switch.vue'
import VuerProgressBar from '@/components/progress-bar/progress-bar.vue'
import VuerProgressBarStep from '@/components/progress-bar/progress-bar-step.vue'

const components = [
    VuerButton, VuerCheckbox, VuerCheckboxGroup, VuerDialog,
    VuerForm, VuerFormItem, VuerInput, VuerRadio, VuerRadioGroup, VuerSwitch, VuerProgressBar, VuerProgressBarStep
]


// 注册组件
const vuerPlugin = {
    install(app) {
        components.forEach(item => app.component(item.name, item))
    }
}

export { vuerPlugin }