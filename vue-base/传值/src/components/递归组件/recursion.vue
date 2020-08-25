<template>
    <ul v-if="isArr">
        <li v-for="(child, index) in item" :key="index">
            <h1>{{child.name}}</h1>
            <recursion v-if="child.children" :item=child.children></recursion>
        </li>
    </ul>
</template>

<script>
    // <!-- 定义一个递归组件 -->
    // <!-- 如果是数组,  -->
    // <!-- 就遍历这个数组, 取出里面的对象name值 -->
    import { defineComponent, computed } from 'vue'
    export default defineComponent({
        name: 'recursion',
        props: {
            item: { type: Array }
        },
        setup(props) {
            const isArr = computed(() => {
                // console.log(Array.isArray(props.item) && props.item.length > 0)
                return Array.isArray(props.item) && props.item.length > 0
            })
            // console.log("是否为真?", isFolder.value)
            return { isArr }
        }
    })
</script>

<style lang="scss" scoped>

</style>