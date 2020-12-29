<template>
    <div class="TextInput" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
        <label :for="name">{{ label }}</label>
        <input :name="name" :id="name" :type="type" :value="inputValue" @input="handleChange" @blur="handleBlur" />
        <p class="help-message" v-show="errorMessage || meta.valid">
            {{ errorMessage || successMessage }}
        </p>
    </div>
</template>

<script>
    // vue3 中的 v-model 绑定视频教程
    // https://www.bilibili.com/video/av754116529
    // https://codesandbox.io/s/custom-text-input-with-vee-validate-v4-8k9gy?from-embed=&file=/src/components/TextInput.vue:862-1326
    import { useField } from 'vee-validate'
    // import * as yup from 'yup'
    import { defineComponent, /*  ref  */ } from 'vue'
    export default defineComponent({
        name: 'text-input',
        props: {
            type: { type: String, default: "text", },
            value: { type: String, default: "", },
            name: { type: String, required: true, },
            label: { type: String, required: true, },
            successMessage: { type: String, default: "", },
        },
        setup(props) {
            // we don't provide any rules here because we are using form-level validation
            // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
            const {
                value: inputValue,
                errorMessage,
                handleBlur,
                handleChange,
                meta,
            } = useField(props.name, undefined, {
                initialValue: props.value,
            });

            return { handleChange, handleBlur, errorMessage, inputValue, meta, };
        },
    })
</script>

<style lang="scss" scoped>
    .TextInput {
        position: relative;
        margin-bottom: calc(1em * 1.5);
        width: 100%;
    }

    label {
        display: block;
        margin-bottom: 4px;
        width: 100%;
    }

    input {
        border-radius: 5px;
        border: 2px solid transparent;
        padding: 15px 10px;
        outline: none;
        background-color: #f2f5f7;
        width: 100%;
        transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
            background-color 0.3s ease-in-out;
    }

    input:focus {
        border-color: var(--primary-color);
    }

    .help-message {
        position: absolute;
        bottom: calc(-1.5 * 1em);
        left: 0;
        margin: 0;
        font-size: 14px;
    }

    .TextInput.has-error input {
        background-color: var(--error-bg-color);
        color: var(--error-color);
    }

    .TextInput.has-error input:focus {
        border-color: var(--error-color);
    }

    .TextInput.has-error .help-message {
        color: var(--error-color);
    }

    .TextInput.success input {
        background-color: var(--success-bg-color);
        color: var(--success-color);
    }

    .TextInput.success input:focus {
        border-color: var(--success-color);
    }

    .TextInput.success .help-message {
        color: var(--success-color);
    }
</style>