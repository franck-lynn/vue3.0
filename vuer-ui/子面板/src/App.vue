<template>
    <!-- 在首页 即 本 App.vue 文件上带的导航栏 -->
    <nav>
        <ul>
            <li v-for="{path, name} in routes" :key="name">
                <router-link :to="path">{{name}} </router-link>
            </li>
        </ul>
    </nav>
    <!-- 路由出口 -->
    <router-view></router-view>
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

    // 样式参照如下网站:
    // https://codepen.io/kevinpowell/pen/GrLKNo
    nav {
        display: inline-flex;  // nav 是菜单栏的顶级元素
        width: 100%;
        height: 45px;
        background: #55d6aa;
        // justify-content: center;
        align-items: center; // 交叉轴上的对齐方式: 居中对齐
        font-weight: bold;
        font-size: 24px;
        flex-wrap: wrap; // 一行排不下时自动换行

        li {
            display: inline-block; // li 元素在 nav 中是垂直居中
            margin-left: 20px;
            // padding-top: 23px;
            position: relative; // 相对于 li 自己是相对定位

            a {
                // margin: 5px; 
                text-decoration: none;
                // width: 200px;
                @include link-colors(rgb(231, 15, 220), rgb(255, 0, 0), #fb0, rgb(167, 85, 52), #f00);

                // 导航菜单上的标记线, 是一个线条块
                &::before {
                    content: '';
                    display: block;
                    height: 5px;
                    background-color: #444;
                    position: absolute;
                    top: -50%; // 由于 a 没有设置宽高, 标记线定位 top: 0; 时就是在 a的上方, 会显示在中间位置, 所以要向上偏 -50%
                    width: 0%; // 刚开始时的宽度是 0
                    transition: all ease-in-out 250ms;
                }

                &:hover::before {
                    width: 100%; // 悬停的时候宽度
                }
            }
        }


    }
</style>