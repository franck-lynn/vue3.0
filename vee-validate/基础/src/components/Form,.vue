<template>
    <div id="app">
        <Form @submit="onSubmit">
            <Field name="email" as="input" :rules="validateEmail" />
            <ErrorMessage name="email" />
            <button>Sign up</button>
        </Form>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { Form, Field, ErrorMessage, } from 'vee-validate';

    export default defineComponent({
        components: { Form, Field, ErrorMessage },
        name: 'Form,',
        props: {},
        setup() {
            const onSubmit = (values) => {
                alert(JSON.stringify(values, null, 2));
            }
            const validateEmail = (value) => {
                // if the field is empty
                if (!value) {
                    return 'This field is required';
                }

                // if the field is not a valid email
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    return 'This field must be a valid email';
                }

                // All is good
                return true;
            }
            return { onSubmit, validateEmail }
        }
    })
</script>

<style lang="scss" scoped>

</style>