<template>
    <div>
        <form @submit.prevent="onSubmit">
            <input name="name" v-model="name" type="text" />
            <span>{{ nameErrors[0] }}</span>

            <input name="email" v-model="email" type="email" />
            <span>{{ emailErrors[0] }}</span>

            <input name="password" v-model="password" type="password" />
            <span>{{ passwordErrors[0] }}</span>

            <button>Submit</button>
        </form>
    </div>
</template>

<script>
    //! https://logaretm.com/blog/2020-05-06-the-case-for-hoc-vs-composition-api/
    import { useField, useForm, configure } from 'vee-validate'
    import { localize, setLocale } from '@vee-validate/i18n';
    import { required, email } from '@vee-validate/rules';
    import en from '@vee-validate/i18n/dist/locale/en.json';
    import ar from '@vee-validate/i18n/dist/locale/ar.json';
    // import { Field, Form } from 'vee-validate';
    import * as yup from 'yup'

    import { defineComponent } from 'vue'
    export default defineComponent({

        name: 'at-vee-validate-i18n',
        props: {},
        setup() {
            const { form, handleSubmit } = useForm();
            //! useField() 方法使用了这个 form
            const { value: name, errors: nameErrors } = useField('name', required, { form });

            const { value: email, errors: emailErrors } = useField('email', 'required|email', { form });
            const { value: password, errors: passwordErrors } = useField('password', 'required|min:8', { form });
            configure({
                generateMessage: localize({en, ar})
                    // generateMessage: localize({
                    //     en: {
                    //         messages: {
                    //             required: 'This field is required',
                    //         },
                    //     },
                    //     ar: {
                    //         messages: {
                    //             required: 'هذا الحقل مطلوب',
                    //         },
                    //     },
                    // })
                }),
                setLocale('ar');

            const onSubmit = handleSubmit((values) => {
                alert(JSON.stringify(values, null, 2))
            })
            return {
                name,
                nameErrors,
                password,
                passwordErrors,
                email,
                emailErrors,
                onSubmit,
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>