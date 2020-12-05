<template>
    <!-- location对象 -->
    <form action="">
        <input type="text" name="user">
        <input type="password" name="password">
        <button type="submit"> 提交 </button>
    </form>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'location-object',
        props: {},
        setup() {
            console.log("主机名称带端口号: ", location.host)
            console.log("主机名称: ", location.hostname)
            console.log("浏览器中的完整地址: : ", location.href)
            console.log("路径名称: : ", location.pathname)
            console.log("协议: : ", location.protocol)
            console.log("字符串: : ", location.search)
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>