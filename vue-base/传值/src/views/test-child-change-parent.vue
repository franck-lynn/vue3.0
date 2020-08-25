<template>
    <!-- 父组件, 接收子组件child-change-parent 传过来的更改 -->
    <h1>父组件, 接收子组件child-change-parent 传过来的更改</h1>
    <h1>子组件改变父组件数据</h1>
    <child-change-parent :catalogNumber="catalogNumber" @changeParent="changeParent"></child-change-parent>
    <h2>父组件响应子组件更改的数据, 在这里显示 --- <span>{{catalogNumber}} </span></h2>
</template>
 
<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-child-change-parent',
        props: { 
        },
        setup(){
            const catalogNumber = ref('CCMT120408N-SU')
            const changeParent = (e) => {
                console.log("子组件传过来的数据---> ", e)
                catalogNumber.value = e
            }
            return {catalogNumber, changeParent}
        }
    })
</script>
 
<style lang="scss" scoped>
    h1{
        margin: 10px;
        color: blue;
        font-size: 36px;
    }
    h2{
        span{
            font-size: 32px;
            color: green
        }
    }
</style>