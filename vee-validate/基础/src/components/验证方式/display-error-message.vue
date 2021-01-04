<template>
    <!-- 这里有一个field 字段需要验证 -->
    <h1>显示错误信息-字段级错误消息</h1>
    <Field name="field" :rules="rules" v-slot="{field, errors, errorMessage}">
        <input v-bind="field" type="text">
        <span> {{errors[0]}} </span>
        <span> {{errorMessage}} </span>
    </Field>
    
    <h1>表单级错误消息</h1>
    <Form v-slot="{errors}">
        <Field name="field" as="input" :rules="rules"></Field>
        {{errors.field}}
    </Form>
</template>

<script>
    import { defineComponent } from 'vue'
    import * as yup from 'yup';
    import { Field, Form } from 'vee-validate';
    export default defineComponent({
        components: { Field, Form },
        name: 'display-error-message',
        props: {},
        setup() {
            const rules = yup.string().required().min(8)
            return {rules}
        }
    })
</script>

<style lang="scss" scoped>

</style>