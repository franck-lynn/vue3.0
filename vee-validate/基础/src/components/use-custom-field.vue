<template>
    <div>
        <form @submit="onSubmit" :validation-schema="schema">
            <custom-field name="name" type="text" label="Full Name" placeholder="Your Name" success-message="Nice to meet you!" />
            <custom-field name="email" type="email" label="E-mail" placeholder="Your email address" success-message="Got it, we won't spam you!" />
            <custom-field name="password" type="password" label="Password" placeholder="Your password" success-message="Nice and secure!" />
            <custom-field name="confirm_password" type="password" label="Confirm Password" placeholder="Type it again" success-message="Glad you remembered it!" />

            <button class="submit-btn" type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    // import { Form } from "vee-validate";
    import * as Yup from "yup"

    export default {
        name: "use-custom-field",
        // components: { Form, },
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

            return {
                onSubmit,
                schema,
            };
        },
    };
</script>

<style>
    * {
        box-sizing: border-box;
    }

    :root {
        --primary-color: #0071fe;
        --error-color: #f23648;
        --error-bg-color: #fddfe2;
        --success-color: #21a67a;
        --success-bg-color: #e0eee4;
    }

    html,
    body {
        width: 100%;
        height: 100%;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;

        width: 100%;
        height: 100%;
    }

    form {
        width: 300px;
        margin: 0px auto;
        padding-bottom: 60px;
    }

    .submit-btn {
        background: var(--primary-color);
        outline: none;
        border: none;
        color: #fff;
        font-size: 18px;
        padding: 10px 15px;
        display: block;
        width: 100%;
        border-radius: 7px;
        margin-top: 40px;
        transition: transform 0.3s ease-in-out;
        cursor: pointer;
    }

    .submit-btn:hover {
        transform: scale(1.1);
    }
</style>
