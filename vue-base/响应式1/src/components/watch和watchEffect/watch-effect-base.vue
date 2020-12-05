<template>
    <!-- 
        watchEffect 是立即执行一个函数, 这个函数会追踪其依赖的数据,
        与 watch 不同, watchEffect 不用指定其数据源
      -->
    <div>
        {{count}}
        <button @click="changeCount">点击触发副作用</button>
        
    </div>
</template>

<script>
    import { defineComponent, ref, watchEffect } from 'vue'
    export default defineComponent({
        name: 'watch-effect-base',
        props: {},
        setup() {
            const count = ref(0)
            const changeCount = () => {
                count.value++
            }
            
            const stop = watchEffect(
                () => console.log("点击一下, 数据改变一次, 就打印这个函数一次, ", count.value)
            )
            stop() // 停止侦听后, 只是在初始时执行一次 watchEffect, 后面再点击就不再执行了
            return {count, changeCount}
        }
    })
</script>

<style lang="scss" scoped>
    div {
        margin: 20px;
    }
</style>