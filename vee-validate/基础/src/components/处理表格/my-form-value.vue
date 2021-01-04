<template>
    <h1>如果在form组件中添加处理程序, 则 vee-validate 会自动将表单值作为第1个参数传递给处理程序</h1>
    <Form v-slot="{errors}" @submit="onSubmit" :validation-schema="schema">
        <Field name="email" as="input" />
        <Field name="name" as="input" type="email" />
        <Field name="password" as="input" type="password" />
        {{errors.password}}
        <button>Submit</button>
    </Form>
</template>

<script>
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field },
        name: 'my-form-value',
        props: {},
        setup() {
            const schema = yup.object().shape({
                email: yup.string().required().email(),
                name: yup.string().required(),
                password: yup.string().required().min(8),
            });
            const onSubmit = (values) => {
                alert(JSON.stringify(values))
            }
            return { schema, onSubmit }
        }
    })
</script>

<style lang="scss" scoped>

</style>