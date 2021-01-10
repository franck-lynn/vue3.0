<template>
    <h1>组合API</h1>
    <input name="username" type="text" :value="inputValue" @input="handleChange" @blur="handleBlur">
    <p> {{errorMessage}} </p>
</template>

<script>
    import { useField } from 'vee-validate'

    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'use-field-name',
        props: {},
        setup() {
            // const inputValue = ref()
            const {
                //! useField 返回的值 绑定 inputValue 值
                value: inputValue,
                errorMessage, //! 错误消息
                handleBlur,
                handleChange
            } = useField(
                // ! 字段的名称, 验证函数
                'username', validate, /*  { initialValue: '赵敏' } */
            )

            function validate(value) {
                if (!value) {
                    return '这个字段需要的';
                }

                if (value.length < 3) { return '必须包含至少3个字符'; }
                return true;
            }

            return { inputValue, errorMessage, handleBlur, handleChange }
        }
    })
</script>

<style lang="scss" scoped>

</style>