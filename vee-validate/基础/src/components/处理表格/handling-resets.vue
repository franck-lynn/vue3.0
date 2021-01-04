<template>
    <h1>处理重置</h1>
    <Form :validation-schema="schema">
        <Field name="email" as="input" />
        <Field name="name" as="input" type="email" />
        <Field name="password" as="input" type="password" />

        <button type="Submit">Submit</button>
        <button type="reset">Reset</button>
    </Form>
</template>

<script>
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field },
        name: 'handling-resets',
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