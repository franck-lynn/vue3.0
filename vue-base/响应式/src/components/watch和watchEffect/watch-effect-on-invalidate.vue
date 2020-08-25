<template>
    <h1>Hello vue 3!</h1>
    <h2> {{name}} --- {{obj.sex}} </h2>
    <button @click="increase"> clicked {{count}} times </button>
</template>
 
<script>
    // https://blog.csdn.net/weixin_43294560/article/details/107581527
    import { defineComponent, ref, reactive,  watchEffect } from 'vue'
    export default defineComponent({
        name: 'watch-effect-on-invalidate',
        props: { 
        },
        setup(){
            const count = ref(0)
            // const res = 1
            const name = ref('jeff')
            const obj = reactive({sex: 'male'})
            // const robj = readonly(obj)
            
            let timer;
            // let r = readonly('aa') //不具有只读的能力
            watchEffect(
                onInvalidate => {
                    console.log(count.value)
                    onInvalidate(() => {
                        console.log("清除") 
                        // 每次数据改变后就执行一次这个清除计时器的动作, 数字不再增加
                        clearInterval(timer)
                    })
                }, 
                // 
                {
                    onTrigger(e){
                        console.log("调试侦听器行为, 副作用触发时调用", e)
                    },
                    onTrack(e){
                        console.log("reactive或ref 被追踪时调用", e)
                    }
                }
            )
            
            const increase = () => {
                timer = setInterval(() => {
                    count.value++
                }, 1000);
            }
            return { count, increase, name, obj }
        }
    })
</script>
 
<style lang="scss" scoped>
    h1, h2{
        margin: 20px;
    }
    button{
        margin: 20px;
        width: 400px;
        height: 80px;
        font-size: 48px;
        color: red;
    }
</style>