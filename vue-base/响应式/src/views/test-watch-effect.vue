<template>
    <!-- 测试 watchEffect -->
    <watch-effect-base></watch-effect-base>
    <hr>
    <watch-effect-on-invalidate></watch-effect-on-invalidate>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-watch-effect',
        props: { 
        },
        setup(){
            
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>