<template>
    <h1>跨字段验证, 例如: 重复密码</h1>
    <Form>
        <Field name="password" as="input" rules="required" />
        <error-message name="password"></error-message>
        <br>
        <Field name="confirmation" as="input" rules="required|confirmed:password" />
        <error-message name="confirmation"></error-message>
    </Form>
</template>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field, ErrorMessage },
        name: 'cross-field-validation',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>