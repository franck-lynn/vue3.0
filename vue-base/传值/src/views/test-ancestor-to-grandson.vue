<template>
    <h1>祖先组件传数据给后代组件</h1>
    <!-- 这个代表的是祖先组件, 使用到了一个 父组件, 通过这个父组件给孙组件传数据 -->
    <parent :name=name :age=age></parent>
    <!-- 祖先组件改变数据 -->
    <button @click=increase>增加</button>
    <button @click=changename>改变名字</button>
</template>
 
<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-ancestor-to-grandson',
        props: { 
        },
        setup(){
            const name = ref('张三丰')
            const age = ref(98)
            const increase = () => age.value++ 
            
            const changename = () => name.value = name.value === '张三丰' ? '张无忌' : '张三丰'
            
            return {name, age, increase, changename }
        }
    })
</script>
 
<style lang="scss" scoped>
h1{
    margin: 20px;
    font-size: 36px;
    color: pink;
}
    button{
        margin: 20px;
    }
</style>