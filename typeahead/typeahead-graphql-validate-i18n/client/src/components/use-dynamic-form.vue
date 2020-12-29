<template>
    <div id="app">
        <dynamic-form :schema="schema" />
    </div>
</template>

<script>
    import { defineComponent, reactive } from 'vue'
    import * as Yup from "yup";
    import { useI18n } from 'vue-i18n'
    export default defineComponent({
        name: 'use-dynamic-form',
        props: {},
        setup() {
            const { t } = useI18n()
            // setLocale({
            //     // use constant translation keys for messages without values
            //     mixed: {
            //         default: 'forms.validation.invalid',
            //         required: 'forms.validation.required'
            //     },
            //     // use functions to generate an error object that includes the value from the schema
            //     string: {
            //     min: ({ min, ...other }) => ({ transKey: 'forms.validation.minLength', values: { min } }),
            //     max: ({ max }) => ({ transKey: 'forms.validation.maxLength', values: { max } })
            //     }
            // });
            const schema = reactive({
                fields: [{
                        label: 'Name',
                        name: 'name',
                        as: 'input',
                    },
                    {
                        label: 'Email',
                        name: 'email',
                        as: 'input',
                    },
                    {
                        label: 'Password',
                        name: 'password',
                        as: 'input',
                    },
                ],
                validation: Yup.object().shape({
                    email: Yup.string().email().required(t("message.hello")),
                    name: Yup.string().required(),
                    password: Yup.string().min(8).required(),
                })
            })
            return { schema }
        }
    })
</script>

<style lang="scss" scoped>

</style>