<template>
    <h1>Symbol 引用</h1>
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bars"></use>
    </svg>

</template>

<script>
    import iconSvg from '../scss/stylesheets/iconfont/iconfont'
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'vue-svg-ali',
        props: {},
        setup() {

            return {iconSvg}
        }
    })
</script>

<style lang="scss" scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>