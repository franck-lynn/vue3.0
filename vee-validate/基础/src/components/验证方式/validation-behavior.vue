<template>
    <h1>验证行为</h1>
    <Form v-slot="{ errors }">
        <!-- as 属性是渲染成什么样的标签 -->
        <Field name="password" as="input" type="password" :rules="passwordRules"></Field>
        <!-- 文档上这里有个错误, errors.password, 而不是 errors.field -->
        {{errors.password}}
    </Form>
</template>

<script>
    import { configure } from 'vee-validate';
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Field, Form, },
        name: 'validation-behavior',
        props: {},
        setup() {
            // Default values
            configure({
                // handleChange 是唯一触发验证处理的程序, 可以使用 configure 来配置处理程序是否应进行验证
                // controls if `blur` events should trigger validation with `handleChange` handler
                validateOnBlur: true,
                // controls if `change` events should trigger validation with `handleChange` handler
                validateOnChange: false,
                // controls if `input` events should trigger validation with `handleChange` handler
                validateOnInput: false,
                // controls if `update:modelValue` events should trigger validation with `handleChange` handler
                validateOnModelUpdate: true,
            });

            const passwordRules = yup.string().required().min(8)
            return {passwordRules}
        }
    })
</script>

<style lang="scss" scoped>

</style>