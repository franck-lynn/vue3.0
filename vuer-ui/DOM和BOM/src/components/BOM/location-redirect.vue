<template>
    <!-- 页面跳转 -->
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'location-redirect',
        props: {},
        setup() {
            onMounted(() => {
                setTimeout(() => {
                    // location.href = "https://www.baidu.com" //会产生历史记录
                    // location.replace('https://www.baidu.com') // 不会产生历史记录
                    // reload 页面重载的方法
                    // 检测浏览器的插件 navigator
                    // console.log(navigator.plugins)

                    const hasPlugin = (name) => {
                        // 如果有插件, 就返回 true
                        name = name.toLowerCase()
                        // 遍历每个插件
                        for (let i = 0; i < navigator.plugins.length; i++) {
                            return navigator.plugins[i].name.toLowerCase().indexOf(name) > -1 ? true : false
                        }
                    }
                    console.log(hasPlugin('Chrome PDF Plugin'))

                }, 2000);
            })

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>