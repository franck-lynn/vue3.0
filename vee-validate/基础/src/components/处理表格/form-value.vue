<template>
    <h1>处理表格</h1>
    <!-- 要显示错误信息, 得有 errors, 这个一般和信息一样, 是放在插槽中的-->
    <!-- 因此, 如果你在这里加入 form 处理程序, vee-validate 会自动将表单值作为第一个参数传递给处理程序 -->
    <!-- 例如: @submit="onSubmit" -->
    <Form v-slot="{values, errors}" :validation-schema="schema">
        <Field name="email" as="input"></Field>
        <Field name="name" as="input" type="email"></Field>
        <Field name="password" as="input" type="password"></Field>
        {{errors.password}}
        <pre>
        {{values}}
        </pre>
    </Form>
</template>

<script>
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field },
        name: 'form-value',
        props: {},
        setup() {
            const schema = yup.object().shape({
                email: yup.string().required().email(),
                name: yup.string().required(),
                password: yup.string().required().min(8),
            });
            return { schema }
        }
    })
</script>

<style lang="scss" scoped>

</style>