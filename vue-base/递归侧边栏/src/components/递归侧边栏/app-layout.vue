<template>
    <div class="box-resize-demo">
        <!-- <div class="scalable">
            <div class="content">
                <img src="../../scss/images/logo.png" alt="logo">
            </div>-->

        <!-- 分割线 -->
        <!-- <div class="separator"><i></i><i></i></div>
        </div> -->
        <sidebar-list></sidebar-list>



        <div class="main">
            <div class="content">右边内容 welcome to codingstartup </div>
            <div><a href="/#/">返回主页</a></div>
        </div>


    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'app-layout',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .box-resize-demo {
        height: 100vh;
        display: flex;

        -webkit-user-select: none;
        user-select: none;

        .main {
            margin: 20px;
            background-color: #eee;
            flex: 1
        }
    }
</style>