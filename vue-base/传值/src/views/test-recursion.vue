<template>
    <recursion :item=items></recursion>
</template>

<script>
    // <!-- 使用递归组件 -->
    // <!-- 递归组件绑定的是一个数组 -->
    // <!-- 第1次调用递归组件时, items 传入 -->
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-recursion',
        props: {},
        setup() {
            const items = ref([
                { name: "项目1" },
                { name: "项目2" },
                { name: "项目3", children: [{ name: '子项目a' }, { name: '子项目b', children: [{ name: '子子项目xx' }] }] },
                { name: "项目4" },
            ])
            return { items }
        }
    })
</script>

<style lang="scss" scoped>

</style>