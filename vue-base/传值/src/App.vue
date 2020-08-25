<template>
    <div id="app">
        <router-link v-for="{path, name} in routes" :to="path" :key="name">{{name}} | </router-link>
        <!-- 路由出口 -->
        <router-view></router-view>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'App',
        props: {},
        setup() {
            // 读取 views 下的文件, 自动生成链接的文件, 默认是采用 vue文件的 name
            const files = require.context('@/views/', true, /\.vue$/)
            let routes = []
            files.keys().forEach(key => {
                const module = files(key).default
                routes = routes.concat({
                    path: '/' + module.name,
                    name: module.name,
                })
            })
            return {
                routes
            }
        }
    })
</script>

<style lang="scss">
    @import '~compass-mixins/lib/compass';
    // 清除所有的默认样式
    @include global-reset;
    // shared.scss 是 全局的样式入口文件
    @import 'scss/scss/entries/shared.scss';
    
   
</style>