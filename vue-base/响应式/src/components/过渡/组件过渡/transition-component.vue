<template>
    <!-- 这是一个过渡组件, 点击这个切换按钮时就会有动画效果 -->
    <button @click="show=!show">切换</button>
    <transition name="fade">
        <p v-if="show">动画效果一</p>
    </transition>

    <transition name="slide-fade">
        <p v-if="show">动画效果二</p>
    </transition>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'transition-component',
        props: {},
        setup() {
            const show = ref(true)

            return { show }
        }
    })
</script>

<style lang="scss" scoped>
    p {
        margin: 30px;
    }

    // 效果一
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to

    /* .fade-leave-active below version 2.1.8 */
        {
        opacity: 0;
    }

    // 效果二
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to

    /* .slide-fade-leave-active for below version 2.1.8 */
        {
        transform: translateX(10px);
        opacity: 0;
    }
</style>