<template>
    <!-- 从祖先组件注入, 这里使用了一个子组件 -->
    <child-inject></child-inject>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'parent-inject',
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