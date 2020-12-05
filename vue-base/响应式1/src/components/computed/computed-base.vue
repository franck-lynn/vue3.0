<template>
    <!-- computed 是传入的一个 getter 函数, 所以, 是有返回值的 -->
    <h1>count的值: {{count}} ---- 计算后的属性值: {{plusOne}} </h1>
    <button @click="count+=1">加1</button>
</template>

<script>
    import { defineComponent, ref, /* computed, */ watchEffect } from 'vue'
    export default defineComponent({
        name: 'computed-base',
        props: {},
        setup() {
            const count = ref(1)
            // 只执行一次, 不能重复执行
            // const plusOne = computed(
            //     () => count.value + 1
            // )
            const plusOne = ref(0)
            watchEffect(
                () => {
                    plusOne.value = count.value + 1
                    // watchEffect 可以监视数值的变化, 并且可以打印出来
                    console.log("计算后的值: ", plusOne.value)
                }
            )
            // console.log("计算后的值: ", plusOne.value)
            return { count, plusOne }
        }
    })
</script>

<style lang="scss" scoped>
    h1,
    button {
        margin: 20px;
    }
</style>