<template>
    <!-- <label for="locale">locale</label>
    <select v-model="$i18n.locale">
        <option>cn</option>
        <option>en</option>
    </select> -->
    <!-- 切换语言 -->
    <locale-changer></locale-changer>
    <!-- 直接路由出口, 根元素是 index.html 里的 <div id="root"></div> -->
    <router-view></router-view>
</template>

<script>
    import { defineComponent } from 'vue'
    import localeChanger from './components/locale-changer.vue/locale-changer.vue'
    export default defineComponent({
        components: { localeChanger },
        name: 'App',
        props: {},
        setup() {
            return {}
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