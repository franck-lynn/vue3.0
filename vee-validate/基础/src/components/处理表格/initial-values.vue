<template>
    <h1>初始值</h1>
    <Form :validation-schema="schema" :initial-values="formValues">
        <Field name="email" as="input" />
        <Field name="name" as="input" type="email" />
        <Field name="password" as="input" type="password" />

        <button type="Submit">Submit</button>
    </Form>
</template>

<script>
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field },
        name: 'initial-values',
        props: {},
        setup() {
            const schema = yup.object().shape({
                email: yup.string().required().email(),
                name: yup.string().required(),
                password: yup.string().required().min(8),
            });
            // 初始值
            const formValues = {
                email: 'example@example.com',
                name: 'John Smith',
                password: 'P@$$w0Rd',
            }
            return { schema, formValues }
        }
    })
</script>

<style lang="scss" scoped>

</style>