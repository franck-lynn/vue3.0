<template>
    <h1>练习 reactive 的使用 2</h1>
    <reactive-component-torefs> </reactive-component-torefs>
</template>
 
<script>
    
    
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-reactive-component-torefs',
        props: { 
        },
        setup(){
            
            return {
            }
        }
    })
</script>
 
<style lang="scss" scoped>
    h1{
        margin: 24px;
        font-size: 24px;
        font-weight: bold;
        color: red;
    }
   
</style>