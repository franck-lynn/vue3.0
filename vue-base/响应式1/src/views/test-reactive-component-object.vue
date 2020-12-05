<template>
    <h1>练习 reactive 的使用 1 </h1>
    <reactive-component-object> </reactive-component-object>
</template>
 
<script>
    
    
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-reactive-component-object',
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