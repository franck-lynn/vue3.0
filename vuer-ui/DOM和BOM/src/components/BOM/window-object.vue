<template>
    <!-- 
        浏览器对象模型 BOM
        1. window
           alert
           confirm
           prompt
           
           setInterval
           setTimeout
        2. location
           href
           hash
           url
           ...
           reload
        3. screen
        4. history
           go()
     -->
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'window-object',
        props: { 
        },
        setup(){
            // const r = window.confirm("你确定要离开网站吗?") // 返回 true 或者 false
            // console.log(r)
            const r = prompt("输入的内容: ", '默认值') // 返回值是输入的内容
            console.log(r)
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>