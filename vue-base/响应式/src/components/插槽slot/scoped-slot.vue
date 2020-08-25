<template>
    <!-- 这是一个作用域插槽, 属性值可以被父组件使用 -->
    <span>
        <slot v-bind:scoped="user">
            {{ user.lastName }}
        </slot>
    </span>
</template>

<script>
    import { defineComponent, reactive } from 'vue'
    export default defineComponent({
        name: 'scoped-slot',
        props: {},
        setup() {
            const user = reactive({
                // firstName: 'zs',
                lastName: '张三'
            })
            return {user}
        }
    })
</script>

<style lang="scss" scoped>
    span {
        margin: 20px;
        color: violet;
        width: 100px;height: 30px;
        border: 1px solid red;
    }
</style>