<template>
    <!-- 引用第三方的过渡库 -->
    <button @click="show = !show">
        Toggle render
    </button>
    <transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
        <p v-if="show">hello</p>
    </transition>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'third-party-transition',
        props: {},
        setup() {
            const show = ref(false)
            return { show }
        }
    })
</script>

<style lang="scss" scoped>
    //! 使用第3方的 动画库, 第3方动画导入的包不能时 项目目录下的 animate.css, 而是 source/animate.css
    @import '~animate.css/source/animate.css';
    button, p{
        margin: 20px;
    }
</style>