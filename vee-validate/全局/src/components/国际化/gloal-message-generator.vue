<template>
    <h1>全局消息生成器</h1>
    <Form>
        <Field name="name" as="input" rules="required" />
        <ErrorMessage name="name" />
    </Form>
</template>
 
<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field, ErrorMessage },
        name: 'gloal-message-generator',
        props: { 
        },
        setup(){
            
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>