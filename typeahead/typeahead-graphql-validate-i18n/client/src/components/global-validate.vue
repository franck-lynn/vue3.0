<template>
    <Form>
        <Field name="name" as="input" rules="required" />
        <ErrorMessage name="name" />
        
        <label for="input">Field</label>
        <Field name="input" rules="required" />
        
    </Form>
</template>

<script>
    import { Form, Field, ErrorMessage } from "vee-validate"
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field, ErrorMessage},
        name: 'global-validate',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>