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
    import * as yup from 'yup'
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'use-form-schema',
        props: {},
        setup() {
            //! 这是使用 schema 的情况
            const { form, handleSubmit } = useForm({
                validationSchema: yup.object().shape({
                    name: yup.string().required(),
                    email: yup.string().required().email(),
                    password: yup.string().required().min(3),
                })
            });
            //! useField() 方法使用了这个 form
            //! schema 还是需要定义的
            const { value: name, errorMessage: nameError } = useField('name', undefined, { form });
            const { value: email, errorMessage: emailError } = useField('email', undefined, { form });
            const { value: password, errorMessage: passwordError } = useField('password', undefined, { form });

            const onSubmit = handleSubmit((values) => {
                alert(JSON.stringify(values, null, 2))
            })
            return {
                name,
                nameError,
                password,
                passwordError,
                email,
                emailError,
                onSubmit
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>