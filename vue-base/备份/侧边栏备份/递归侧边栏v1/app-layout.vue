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
            <!-- <div v-if="isSm" class="is-sm"> 现在是窄屏 </div>
            <div v-else class="is-lg"> 现在是宽屏 </div> -->
        </div>


    </div>
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'app-layout',
        props: {},
        setup() {
            const isSm = ref(false)
            onMounted(() => {
                // window.onresize = function (){
                //     const screenWidth = document.body.clientWidth
                //     // console.log("宽窄屏判断--> ", screenWidth)
                //     if(screenWidth < 768){
                //         // 当处于窄屏状态时, 设置了 narrow类 isNarrow.value=true
                //         isSm.value = true
                //     } else{
                //         isSm.value = false
                //     }
                // }
            })
            return {/* isSm */}
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
            flex: 1;
            .is-sm{
                color: red;
            }
        }
    }

   @media screen and (max-width: 768px) and (min-width: 320px) {
        .box-resize-demo {
            .main {
                width: 100%;
                margin: 20px;
                // background-color: red;
                flex: 1
            }
        }
    }
</style>