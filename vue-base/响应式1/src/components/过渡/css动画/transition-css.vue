<template>
    <!-- css 动画 -->
    <button @click="show=!show">切换</button>
    <transition name="bounce">
        <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
    </transition>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'transition-css',
        props: {},
        setup() {
            const show = ref(true)

            return { show }
        }
    })
</script>

<style lang="scss" scoped>
    p, button {
        margin: 30px;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }

        50% {
            transform: scale(1.5);
        }

        100% {
            transform: scale(1);
        }
    }
</style>