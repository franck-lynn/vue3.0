<template>
    <!-- 这是一个子组件, 数据通过父组件传过来 -->
    <div>
        <h1>父组件的数据 {{name}}</h1>
        <h1>父组件的数据 {{age}}</h1>
    </div>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'child-data-from-parent',
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
    div{
        margin: 10px;
    }
</style>