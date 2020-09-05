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
            <!-- https://www.jb51.cc/html5/168505.html -->
            <dropdown-menu> </dropdown-menu>
            <section>
                <!-- section 作为一个子路由的出口, 这里显示主要的程序界面 -->
                <div class="content">右边内容AAA welcome to </div>
                <div class="content">右边内容 welcome to </div>
                <div class="content">右边内容 welcome to </div>
                <div class="content">右边内容 welcome to </div>
                <div class="content">右边内容 welcome to </div>
                <div class="content">右边内容 welcome to </div>


            </section>
            <sticky-footer> </sticky-footer>
        </div>
    </div>
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'app-layout',
        props: {},
        setup() {
            // 获取整个页面的宽度
            onMounted(() => {
                const screenWidth = window.getComputedStyle(document.querySelector('.box-resize-demo')).width
                console.log(screenWidth)
            })
            return {}
        }
    })
</script>

<style lang="scss" scoped>
    $height-icon-btn: 45px; // 把导航栏的高度空出来, 这样页面内容就不会被导航栏遮住了
    $width-scrollbar: 6px;

    .box-resize-demo {
        // 改为 100% 也有问题, 页脚不能始终在下面, 但是 .main 框可以设置为弹性大小
        // 100vh 时 .main 框 也可以按需要撑大
        height: 100vh;
        display: flex;
        -webkit-user-select: none;
        user-select: none;

        //? 在这里设置滚动条的样式 
        ::-webkit-scrollbar {
            width: $width-scrollbar;
            
        }

        //? 滚动槽 
        ::-webkit-scrollbar-track {
            background: rgb(66, 79, 99);
            cursor: default;
            position: fixed;
            top: 0px;
            height: 100%;
            right: 0px;
            // opacity: 0.5;
            visibility: hidden;
            transition: all .2s linear; // 代替display 实现过渡效果
            &:hover {
                opacity: 1;
                visibility: visible;
            }
        }

        //? 滚动条滑块 
        ::-webkit-scrollbar-thumb {
            border-radius: $width-scrollbar / 2;
            background-color: rgba(101, 206, 168, 0.493);
            visibility: hidden;
            &:hover {
                visibility: visible;
            }
        }







        .main {
            // margin-left: 45px; // 需要改为 vue 控制
            flex: 1; //给左侧板栏用的
            height: 100%;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            overflow-y: scroll; // 可以显示滚动条, 这样就不用设置右侧边栏固定定位, 同时, 解决了 100vh, 当 .main 撑开后出现白边的问题



            section {
                flex: 1 0 auto; // 1 放大比例, 给 footer 用的
                margin-top: $height-icon-btn; // 把导航栏的高度空出来, 这样页面内容就不会被导航栏遮住了
                // section 是程序主体的内容出口
                padding: 10px;
                // border: 1px solid red;
            }

        }
    }

    @media screen and (max-width: 768px) and (min-width: 320px) {
        .box-resize-demo {
            .main {
                width: 100%;
                flex: 1;

            }
        }
    }
</style>