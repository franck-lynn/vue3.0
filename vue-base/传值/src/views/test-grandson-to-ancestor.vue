<template>
    <h1>后代组件传递数据给祖先组件</h1>
    <!-- 这是一个祖先组件, 目的是测试 从孙组件来改变这个祖先组件的数据 -->
    <father :name=name @changeThisName= changeThisName> </father>
</template>
 
<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-grandson-to-ancestor',
        props: { 
        },
        setup(){
            const name = ref('alice')
            
            const changeThisName = (e) => {
                console.log("02. 孙组件传过来的数据是: ---< ", e)
                name.value = e
            }
            return { name, changeThisName }
        }
    })
</script>
 
<style lang="scss" scoped>
    h1{
        color: red;
        font-size: 36px;
        margin: 20px;
    }
</style>