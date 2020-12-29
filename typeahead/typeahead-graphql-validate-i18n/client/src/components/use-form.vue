<template>
    <div>
        <Form @submit="onSubmit" :validation-schema="schema">
            <text-input name="name" type="text" label="Full Name" placeholder="Your Name" success-message="Nice to meet you!" />
            <text-input name="email" type="email" label="E-mail" placeholder="Your email address" success-message="Got it, we won't spam you!" />
            <text-input name="password" type="password" label="Password" placeholder="Your password" success-message="Nice and secure!" />
            <text-input name="confirm_password" type="password" label="Confirm Password" placeholder="Type it again" success-message="Glad you remembered it!" />
            <button class="submit-btn" type="submit">Submit</button>
        </Form>
    </div>
</template>

<script>
    import { Form } from "vee-validate";
    import * as Yup from "yup";
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form },
        name: 'use-form',
        props: {},
        setup() {
            function onSubmit(values) {
                alert(JSON.stringify(values, null, 2));
            }
            // Using yup to generate a validation schema
            // https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
                confirm_password: Yup.string()
                    .required()
                    .oneOf([Yup.ref("password")], "Passwords do not match"),
            });
            return { onSubmit, schema, }
        }
    })
</script>

<style lang="scss" scoped>

</style>