<template>
    <div class="c1"></div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'keyframes-animate',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    // 旋转
    @keyframes xxxx {

        // 定义关键帧
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .c1 {
        width: 100px;
        height: 100px;
        background-color: pink;
        margin: 100px auto;

        animation: xxxx 2s linear 0s infinite; //! 给谁使用
        // &:hover{
        //     animation: xxxx 2s linear; //! 给谁使用
        // }
    }
</style>