<template>
    <div id="app">
        <v-form @submit="onSubmit" :validation-schema="schema">
            <label for="name">Your Name</label>
            <v-field name="name" as="input" type="text" rules="required"></v-field>
            <error-message name="name"></error-message>

            <label for="name">Age</label>
            <v-field name="age" as="input" type="number" rules="required"></v-field>
            <error-message name="age"></error-message>

            <label for="name">Confirm Age</label>
            <v-field name="ageConfirm" as="input" type="number" rules="required|confirmed:@age"></v-field>

            <error-message name="ageConfirm"></error-message>

            <button>Submit</button>
        </v-form>
    </div>
</template>

<script>
    import { Field, Form, ErrorMessage } from 'vee-validate'
    import * as yup from 'yup';
    import { useI18n } from 'vue-i18n'

    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { VForm: Form, VField: Field, ErrorMessage },
        name: 'i18n-interpolation-example01',
        props: {},
        setup() {
            const { t } = useI18n({ useScope: 'global' })

            const schema = yup.object().shape({
                // name: yup.string().required(t('langs.language')),
                name: yup.string().required(),
                age: yup.number().min(18),
                ageConfirm: yup.number().required().positive().integer(),
            });

            const onSubmit = (values) => {
                alert(JSON.stringify(values))
            }
            return { schema, onSubmit }
        }
    })
</script>

<style lang="scss" scoped>
    span {
        display: block;
        margin: 10px 0;
    }

    label {
        display: block;
    }
</style>