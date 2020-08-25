<template>
    <div class="vuer-radio-group">
        <slot></slot>
    </div>
</template>

<script>
    import { defineComponent, provide } from 'vue'
    export default defineComponent({
        name: 'vuer-radio-group',
        components: {},
        props: {
            // 组件接收到了value值，我们需要触发这个组件的input事件
            // provide 与 inject 用来做祖孙之间得组件通讯
            value: null
        },
        setup(props, ctx) {
            const radioGroupSymbol = Symbol.for('radioGroup')
            provide(radioGroupSymbol, {props, ctx})
            return {
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>