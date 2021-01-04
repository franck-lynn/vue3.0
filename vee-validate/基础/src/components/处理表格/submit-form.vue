<template>
    <h1>如果您计划本地提交表单，这将导致页面“重新加载”，则可以将其submitForm用作事件处理程序</h1>
    <h1>本地提交的意思是直接提交到服务器</h1>
    <VeeForm v-slot="{ submitForm }" :validation-schema="schema" as="div">
        <form @submit="submitForm" method="post" action="/api/users/">
            <Field name="email" as="input" type="email" />
            <Field name="name" as="input"  />
            <Field name="password" as="input" type="password" />

            <button>Submit</button>
        </form>
    </VeeForm>
</template>

<script>
    import { Form as VeeForm, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: {
            // Rename form to avoid confusion with native `form`
            VeeForm,
            Field,
        },
        name: 'submit-form',
        props: {},
        setup() {
            const schema = yup.object().shape({
                email: yup.string().required().email(),
                name: yup.string().required(),
                password: yup.string().required().min(8),
            });
            const submitForm = values => {
                // Submit values to API...
                console.log(values);
            }
            return { schema, submitForm }
        }
    })
</script>

<style lang="scss" scoped>

</style>