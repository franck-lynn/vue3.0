<template>
    <h1>字段级验证-yup</h1>
    <Form v-slot="{ errors }">
        <!-- as 属性是渲染成什么样的标签 -->
        <Field name="password" as="input" type="password" :rules="passwordRules"></Field>
        <!-- 文档上这里有个错误, errors.password, 而不是 errors.field -->
        {{errors.password}}
    </Form>
</template>

<script>
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';

    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Field, Form, },
        name: 'validating-field-with-yup',
        props: {},
        setup() {
            const passwordRules = yup.string().required().min(8)
            return { passwordRules }
        }
    })
</script>

<style lang="scss" scoped>

</style>