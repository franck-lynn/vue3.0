<template>
    <div class="vuer-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    import { defineComponent, provide } from 'vue'
    export default defineComponent({
        name: 'vuer-checkbox-group',
        components: {},
        props: {
            value: { type: Array }
        },
        setup(props, ctx) {
            const checkboxGroupSymbol = Symbol.for('checkboxGroup')
            provide(checkboxGroupSymbol, { props, ctx })
            return {

            }
        }
    })
</script>

<style lang="scss" scoped>
    
</style>