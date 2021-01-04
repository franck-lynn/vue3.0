<template>
    <Form>
        <Field name="name" as="input" rules="required" />
        <ErrorMessage name="name" />
         <br>
        <Field name="email" as="input" rules="required|email" />
        <error-message name="email"></error-message>
        <br>
        <Field name="password" as="input" type="password" rules="required|min:8" />
        <error-message name="password"></error-message>
    </Form>
</template>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field, ErrorMessage },
        name: 'defining-global-validators',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>