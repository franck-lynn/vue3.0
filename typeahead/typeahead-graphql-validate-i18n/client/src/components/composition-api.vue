<template>
    <div>
        <!-- <input type="text" v-model="value" /> -->
        <input type="text" v-model="username" />
        {{username}}
    </div>
</template>

<script>
    // https://thewebdev.info/2020/11/19/form-validation-in-a-vue-3-app-with-vee-validate-4%e2%80%8a-%e2%80%8avalidation-messages-and-composition-api/
    import { useField } from 'vee-validate'

    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'composition-api',
        props: {},
        setup() {
            // useField 里的名称可以是任意的值? 第二个参数是我们用于验证的函数.
            // 这里的 value 相当于做了 const value = ref(null), 也是双向绑定的, 
            // const { value, errorMessage } = useField("fieldName", validate);
            const { username, errorMessage } = useField("username", validate);
            console.log("用户名", errorMessage)
            function validate(value) {
                if (!value) { return '需要填写这个字段'; }
                if (value.length < 3) { return '输入不少于3个字符'; }
                // 返回true表示输入的值（即value参数）有效
                return true;
            }
            // return { value, errorMessage }
            return { username, errorMessage }
        }
    })
</script>

<style lang="scss" scoped>

</style>