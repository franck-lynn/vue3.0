<template>
    <!-- 
        index.vue 作为一个总的链接页面, 通过这个页面直接到达各个页面, 并且, 
        渲染都是直接在 根路由出口, 也就是 App.vue里的 router-views 里出来的
    -->
    <!-- 以侧边栏的型式显示 -->
    <h3 v-for="link in links" :key="link"> <a :href="`/#${link}`"> {{link}} </a> </h3>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'index',
        props: {},
        setup() {
            let links = []
            
            return { links }
        }
    })
</script>

<style lang="scss" scoped>
    h3{
        margin: 20px;
        a{
            text-decoration: none;
        }
    }
</style>