<template id="dynamic-form">
    <v-form :validation-schema="schema.validation" :initial-values="schema.values" @submit="onSubmit">
        <div v-for="{ name, as, label, children, ...attrs } in schema.fields" :key="name">
            <label :for="name">{{ label }}</label>
            <v-field :as="as" :id="name" :name="name" v-bind="attrs">
                <template v-if="children && children.length">
                    <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag" v-bind="childAttrs">
                        {{ text }}
                    </component>
                </template>
            </v-field>
            <error-message :name="name"></error-message>
        </div>

        <button>Submit</button>
    </v-form>
</template>


<script>
    // https://vijitail.dev/blog/form-validation-in-vue-using-yup/
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: {
            VForm: Form,
            VField: Field,
            ErrorMessage: ErrorMessage,
        },
        name: 'dynamic-form',
        props: { schema: { type: Object, required: true } },
        setup() {
            const onSubmit = (values) => {
                alert(JSON.stringify(values, null, 2));
            }
            return { onSubmit }
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