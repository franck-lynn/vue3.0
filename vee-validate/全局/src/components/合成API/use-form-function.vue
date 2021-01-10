<template>
    <div>
        <form @submit.prevent="onSubmit">
            <input name="name" v-model="name" type="text" />
            <span>{{ nameError }}</span>

            <input name="email" v-model="email" type="email" />
            <span>{{ emailError }}</span>

            <input name="password" v-model="password" type="password" />
            <span>{{ passwordError }}</span>

            <button>Submit</button>
        </form>
    </div>
</template>

<script>
    //! https://logaretm.com/blog/2020-05-06-the-case-for-hoc-vs-composition-api/
    import { useField, useForm } from 'vee-validate'
    // import { Field, Form } from 'vee-validate';
    import * as yup from 'yup'
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'use-form-function',
        props: {},
        setup() {
            const { form, handleSubmit } = useForm();
            //! useField() 方法使用了这个 form
            const { value: name, errorMessage: nameError } = useField('name', 'required', { form });
            const { value: password, errorMessage: passwordError } = useField('password', 'required|min:8', { form });
            const { value: email, errorMessage: emailError } = useField('email', 'required|email', { form });
            const onSubmit = handleSubmit((values) => {
                alert(JSON.stringify(values, null, 2))
            })
            return {
                name, nameError, password, passwordError, email, emailError, onSubmit
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>