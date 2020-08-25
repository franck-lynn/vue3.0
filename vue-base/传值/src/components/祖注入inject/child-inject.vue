<template>
    <div>
        <h3> 这里的数据是通过祖先组件注入的 --- {{name}} </h3>
        <button @click="changeAnne">后代组件改变注入值</button>
    </div>
</template>

<script>
    import { defineComponent, inject } from 'vue'
    export default defineComponent({
        name: 'child-inject',
        props: {
            name: { type: String, default: '' }
        },
        setup() {
            const anneSymbol = Symbol.for('anne')
            const { name } = inject(anneSymbol)
            console.log(name.value)
            //? 那么, 可以改变这个注入的值吗?
            //! 测试结果是可以改变, 而且也是响应式的
            const changeAnne = () => {
                name.value = name.value === '安妮.凯瑟薇'? '亚当.舒尔曼': '安妮.凯瑟薇'
            }
            

            return { name, changeAnne }
        }
    })
</script>

<style lang="scss" scoped>
    h3 {
        color: red;
        font-size: 20px;
        margin: 20px;
    }
    button{
        margin: 20px;
    }
</style>