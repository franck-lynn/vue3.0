<template>
    <!-- 练习 reactive 的使用 -->
    <div>
        <h2> {{name}} -- {{age}} </h2>
        
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs } from 'vue'
    export default defineComponent({
        name: 'reactive-component-torefs',
        props: {},
        setup() {
            const girl = reactive({ name: "Alice", age: 18 })
            // 转换成 ref 
            const {name, age} = toRefs(girl)
            console.log("转换成toRefs后的解构---<", name, age)
            
            const changeName = () => {
                name.value = name.value === 'alice' ? 'Anne' : 'alice'
            }
            const changeAge = () => {
                age.value++
            }
            // return {  changeName, changeAge, ...toRefs(girl) } // 可以完成响应式
            return { changeName, changeAge, name, age } // 这样也可以完成响应式的
        }
    })
</script>

<style lang="scss" scoped>
    h2 {
        margin: 24px;
        font-size: 20px;
        font-weight: bold;
        color: skyblue;
    }

    button {
        margin: 24px;
    }
</style>