<template>
    <h1>测试动画效果</h1>
    <transition-component></transition-component>
    <hr>
    <h1>css 动画</h1>
    <transition-css></transition-css>
    <hr>
    
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-transition',
        props: { 
        },
        setup(){
            
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>

    h1{
        margin-left: 20px;
        color: red;
    }
</style>