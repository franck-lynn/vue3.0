<template>
    <!-- 这是一个父组件, 有name 和 age 两个属性, 分别是祖先组件传过来的 -->
    <grandson :name=name :age=age></grandson>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'parent',
        props: { 
            name: {type: String, default: ''},
            age: {type: Number, default: 1}
        },
        setup(){
            
            return {
            }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>