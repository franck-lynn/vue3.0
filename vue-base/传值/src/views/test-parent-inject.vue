<template>
    <h1>这是父组件上直接展示的数据: --- {{ name}}</h1>
    <parent-inject></parent-inject>

</template>

<script>
    import { defineComponent, ref, provide } from 'vue'
    export default defineComponent({
        name: 'test-parent-inject',
        props: {},
        setup() {
            const name = ref("安妮.凯瑟薇")
            const anneSymbol = Symbol.for('anne')
            provide(anneSymbol, { name })

            return { name }
        }
    })
</script>

<style lang="scss" scoped>
    h1 {
        color: red;
        font-size: 24px;
        margin: 20px;
    }
</style>