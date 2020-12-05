<template>
    <!-- 异步场景用侦听器属性 -->
    <h1>验证用户名是否可用</h1>
    <div>
        <!-- 失去焦点的时候触发 -->
        <!-- 1, 通过 v-model 实现数据绑定, 2. 需要提供提示信息 3, 侦听输入信息变化, 4. 需要触发事件 -->
        <span>用户名</span>
        <span><input type="text" v-model="username" placeholder="请输入用户名"></span>
        <span> {{tip}} </span>
    </div>
</template>

<script>
    import { defineComponent, ref, watch } from 'vue'
    export default defineComponent({
        name: 'watch-async',
        props: {},
        setup() {
            const username = ref('')
            // 默认提示信息
            const tip = ref('')
            // 采用watch监听用户名的变化
            // 调用后台接口进行验证
            // 根据验证结果调用调整信息

            const checkname = username => {
                // 异步操作, 调用接口, 可以采用定时任务的方式模拟接口调用
                setTimeout(() => {
                    // 模拟接口调用
                    if (username === 'admin') {
                        tip.value = '用户名已存在, 请更改一个'
                    } else {
                        tip.value = '用户名可以使用'
                    }
                }, 1000);

            }
            watch(
                username,
                // 调用后台接口验证用户名的合法性
                (value) => {
                    checkname(value)
                    tip.value = '正在验证...'
                    return "看看侦听器是否有返回结果"
                }
            )
            return { username, tip }
        }
    })
</script>

<style lang="scss" scoped>

</style>