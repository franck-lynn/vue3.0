<template>
    <h1>提交进度</h1>
    <v-form :validation-schema="schema" @submit="onSubmit" v-slot="{ isSubmitting }">
        <label>
            Name
            <v-field name="name" type="text"></v-field>
        </label>
        <error-message name="name"></error-message>
        <label>
            Email
            <v-field name="email" type="email"></v-field>
        </label>
        <error-message name="email"></error-message>

        <label>
            Password
            <v-field name="password" type="password"></v-field>
        </label>
        <error-message name="password"></error-message>

        <button :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
            Submit
        </button>
    </v-form>
</template>

<script>
    // https://vee-validate.logaretm.com/v4/guide/handling-forms#submission-progress
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { VForm: Form, VField: Field, ErrorMessage},
        name: 'submissions-progress',
        props: {},
        setup() {
            const schema = yup.object().shape({
                email: yup.string().email().required(),
                name: yup.string().required(),
                password: yup.string().min(8).required(),
            })
            const onSubmit = (values) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(JSON.stringify(values, null, 2))
                    }, 2000);
                })
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
        margin: 10px 0;
    }

    button {
        position: relative;
        min-width: 100px;
        min-height: 50px;
    }

    button.submitting::after {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        top: calc(50% - 0.5rem);
        left: 1.5rem;
        border-radius: 2em;
        border-color: transparent transparent black black;
        border-style: solid;
        border-width: 0.15em;
        animation: spinner-rotation 0.75s infinite;
        animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    @keyframes spinner-rotation {
        to {
            transform: rotate(360deg);
        }
    }
</style>