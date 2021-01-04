<template>
    <h1>嵌套对象</h1>
    <Form @submit="onSubmit">
        <Field name="links.twitter" type="url" />
        <Field name="links.github" type="url" />

        <button>Submit</button>
    </Form>
</template>
 
<script>
    import { Field, Form } from 'vee-validate';
    // import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field },
        name: 'nested-objects',
        props: { 
        },
        setup(){
            const onSubmit = (values) => {
                alert(JSON.stringify(values, null, 2))
            }
            return { onSubmit }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>