<template>
    <h1>递归组件-测试</h1>
    <recursion-component></recursion-component>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-recursion-component',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    h1 {
        margin: 20px;
    }
</style>