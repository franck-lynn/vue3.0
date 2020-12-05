<template>
    <!-- 查询字符串 -->
    <form action="">
        <input type="text" name="user" value="aaa">
        <input type="password" name="password" value="bbb">
        <button type="submit"> 提交 </button>
    </form>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'query-string',
        props: { 
        },
        setup(){
            // http://localhost:8080/#/query-string?user=lynn&password=123
            // 1. 获取查询字符串
            let qs = location.search.length > 0 ? location.search.substring(1): ''
            // 2. 取得每一项
            const item = qs.length ? qs.split('&') : []
            console.log(item)
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>