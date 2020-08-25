<template>
    <!-- 测试动态元素 -->
    <h1>动态元素</h1>
    <dynamic-element></dynamic-element>
    <hr>
    <h1>动态组件</h1>
    <dynamic-component></dynamic-component>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-dynamic-component',
        props: { 
        },
        setup(){
            
            return {
            }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>