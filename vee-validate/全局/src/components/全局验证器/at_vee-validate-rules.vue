<template>
    <Form>
        <Field name="field" rules="alpha" />
        <ErrorMessage name="field" />
       
    </Form>
</template>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field, ErrorMessage },
        name: 'at_vee-validate-rules',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>