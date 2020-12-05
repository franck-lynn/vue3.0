<template>
    <!-- 练习 reactive 的使用 -->
    <div>
        <h2> {{girl.name}} -- {{girl.age}} </h2>
        <h2>使用解构出来的数据, 失去响应: {{name}} --- {{age}} </h2>
        <!-- 修改数据 -->
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
    </div>
</template>

<script>
    import { defineComponent, reactive } from 'vue'
    export default defineComponent({
        name: 'reactive-component-object',
        props: {},
        setup() {
            const girl = reactive({ name: "Alice", age: 18 })
            // 解构会使对象失去响应
            const { name, age } = girl
            console.log("解构出来的数据---> ", name, age)
            console.log(girl.value)
            const changeName = () => {
                girl.name = girl.name === 'alice' ? 'Anne' : 'alice'
            }
            const changeAge = () => {
                //! 这句本身就包含 girl.age = girl.age+1, 所以使用 
                //! girl.age = girl.age++ 就是多余的了
                girl.age++
            }
            return { girl, changeName, changeAge, name, age }
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