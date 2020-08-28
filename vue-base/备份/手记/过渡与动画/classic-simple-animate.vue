<template>
    <div id="demo">
        <button v-on:click="show = !show">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'classic-simple-animate',
        props: {},
        setup() {
            const show = ref(false)
            return { show }
        }
    })
</script>

<style lang="scss" scoped>
    #demo {
        margin: 20px;
    }
    // 进入前, 离开后
    .fade-enter,
    // 进入前, 此时还没有进入
    .fade-leave-to {
        // 离开后, 此时元素已经离开了动画
        opacity: 0;
        transform: translateX(150px);
    }
    // 入场, 离场动画的时间段
    .fade-enter-active,
    // 进入时间段
    .fade-leave-active {
        // 离开时间段
        transition: all 1s ease;
    }
</style>