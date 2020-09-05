<template>
    <div>
        <h3>表单-组件整合</h3>
        <h4>输入的内容: {{model.username}} --{{model.passowrd}} --{{model.picked}} </h4>
        <vuer-form :model="model" label-width="80px">
            <vuer-form-item label="用户名: ">
                <vuer-input placeholder="请输入用户名" clearable v-model:value="model.username"></vuer-input>
            </vuer-form-item>
            <vuer-form-item label="密码: ">
                <vuer-input type="password" placeholder="请输入密码" showPassword v-model:value="model.passowrd"></vuer-input>
            </vuer-form-item>
            <vuer-form-item label="选择">
                <vuer-switch active-color="green" inactive-color="red" v-model:value=model.picked></vuer-switch>
            </vuer-form-item>
        </vuer-form>
    </div>
</template>

<script>
    import { defineComponent, reactive } from 'vue'
    export default defineComponent({
        name: 'test-form',
        components: {},
        props: {},
        setup() {
            const model = reactive({
                username: '',
                password: '',
                picked: false
            })
            return {
                model
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>