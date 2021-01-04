<template>
    <h1>嵌套数组</h1>
    <Form @submit="onSubmit">
        <Field name="links[0]" type="url" />
        <Field name="links[1]" type="url" />

        <button>Submit</button>
    </Form>
</template>

<script>
    import { Field, Form } from 'vee-validate';
    // import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field },
        name: 'nested-arrays',
        props: {},
        setup() {
            const onSubmit = (values) => {
                alert(JSON.stringify(values, null, 2))
            }
            return { onSubmit }
        }
    })
</script>

<style lang="scss" scoped>

</style>