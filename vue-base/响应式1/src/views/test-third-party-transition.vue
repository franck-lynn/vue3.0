<template>
    <h1>第3方动画效果</h1>
    <third-party-transition></third-party-transition>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-third-party-transition',
        props: { 
        },
        setup(){
            
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    h1{
        margin: 20px;
    }
</style>