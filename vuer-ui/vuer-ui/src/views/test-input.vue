<template>
    <div>
        <h3>输入框</h3>
        <h4>禁用的输入框</h4>
        <vuer-input placeholder="禁止输入" disabled></vuer-input>
        <h4>普通输入框</h4>
        <h5>输入内容是: {{username}}</h5>
        <!-- 双向 就是 一个 value, 一个 input -->
        <vuer-input placeholder="请输入用户名" v-model="username"></vuer-input>
        <h4>可清空 输入框</h4>
        <vuer-input placeholder="请输入用户名" v-model="username" clearable></vuer-input>
        <h4>密码框</h4>
        <vuer-input type="password" placeholder="请输入密码" v-model="password" showPassword></vuer-input>
    </div>
</template>
 
<script>
    
    
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-input',
        components: {
        },
        props: {  }, 
        setup(){
            const username = ref("")
            const password = ref("")
            console.log(password.value)
            return {
                username, password
            }
        }
    })
</script>
 
<style lang="scss" scoped>
    .vuer-input{
        width: 180px;
        margin-right: 10px
    }
</style>