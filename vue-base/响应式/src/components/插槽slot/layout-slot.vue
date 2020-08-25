<template>
    <!-- 这是一个插槽组件, 父组件在使用这个插槽时传递需要插入的内容, 有注释默认插槽也不会显示, 注意一下 -->
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'layout-slot',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    // 分成三段的结构, .cantainer 代表body, 作为环境的 平面空间
    .container {
        width: 600px;
        height: 200px;
        display: grid;
        border: 1px solid red;
        // 整个平面分为三行
        grid-template-rows: [X1]45px[X2] auto[X3] 45px[X4];
        grid-template-columns: [Y1]200px [Y2]200px [Y3]200px [Y4];
        text-align: center;
        header {
            grid-area: 1/1/2/4;
            background-color: rgba(200, 206, 121, 0.137);
        }
        main{
            grid-area: 2/1/3/4;
            background-color: rgb(218, 179, 161);
        }
        footer {
            grid-area: 3/1/3/4;
            background-color: rgb(231, 196, 196);
        }
    }
</style>