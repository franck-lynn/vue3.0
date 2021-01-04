<template>
    <h1>表单级验证</h1>
    <Form @submit="submit" :validation-schema="simpleSchema" v-slot="{ errors }">
        <Field name="email" as="input" />
        <span>{{ errors.email }}</span>

        <Field name="password" as="input" type="password" />
        <span>{{ errors.password }}</span>

        <button>Submit</button>
    </Form>
</template>

<script>
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Field, Form, },
        name: 'form-level-validation',
        props: {},
        setup() {
            const simpleSchema = {
                email(value) {
                    return value ? true : '这个字段需要';
                },
                // If you defined global rules you can also use them
                password: yup.string().required().min(8),
                // ...
            };

            return { simpleSchema, }
        }
    })
</script>

<style lang="scss" scoped>

</style>