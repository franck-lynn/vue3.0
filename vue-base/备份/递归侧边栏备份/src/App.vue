<template>
    <router-view></router-view>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'App',
        props: {},
        setup() {
            return { }
        }
    })
</script>

<style lang="scss">
    @import '~compass-mixins/lib/compass';
    // 清除所有的默认样式
    @include global-reset;
    // shared.scss 是 全局的样式入口文件
    @import 'scss/scss/entries/shared.scss';
</style>