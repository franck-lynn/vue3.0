<template>
    <h1>测试 通过 props 向子组件传递数据</h1>
    <child-data-from-parent :name= "name" :age=age> </child-data-from-parent>
    <h1>父组件修改数据, 子元素数据同时得到修改</h1>
    <button @click=increase>增加</button>
    <!-- 通过input修改子组件数据, v-model 实际上是一个语法糖, :value 绑定了 value, :input=hangdleInput绑定input事件进行处理-->
    <input type="text" v-model="name">
</template>
 
<script>
    
    
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-child-data-from-parent',
        props: { 
        },
        setup(){
            const name = ref('aclice')
            const age = ref(18)
            const increase = () => age.value++
            
            return { name, age, increase }
        }
    })
</script>
 
<style lang="scss" scoped>
    h1{
        margin: 10px;
        color: red;
        font-size: 36px;
    }
</style>