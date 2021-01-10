<template>
    <h1>全局验证-模式验证</h1>
    <Form @submit="submit" :validation-schema="schema" v-slot="{ errors }">
        <Field name="email" as="input" />
        <span>{{ errors.email }}</span>

        <Field name="password" as="input" type="password" />
        <span>{{ errors.password }}</span>

        <button>Submit</button>
    </Form>
</template>

<script>
    import { Form, Field, } from 'vee-validate';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field, },
        name: 'schema-validations',
        props: {},
        setup() {
            // 这里是全局定义的验证
            const schema = {
                email: 'required|email',
                password: 'required|min:8',
            };
            return { schema }
        }
    })
</script>

<style lang="scss" scoped>

</style>