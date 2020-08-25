<template>
    <!-- <div id="dynamic-component-demo" class="demo">
        <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="currentTab = tab">
            {{ tab }}
        </button>

        <h1 v-if="currentTabComponent ==='tab-home'">古都</h1>
        <h1 v-if="currentTabComponent ==='tab-posts'">望月</h1>
        <h1 v-if="currentTabComponent ==='tab-archive'">日月</h1>
    </div>
    <hr>


    <div id="dynamic-component-demo" class="demo">
        <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTabReactive.tabName === tab }]" @click="currentTabReactive.tabName = tab">
            {{ tab }}
        </button>
        <h1 class="reactive" v-if="currentTabReactiveComponent ==='tab-home'">春晓</h1>
        <h1 class="reactive" v-if="currentTabReactiveComponent ==='tab-posts'">早发白帝城</h1>
        <h1 class="reactive" v-if="currentTabReactiveComponent ==='tab-archive'">芙蓉楼送辛渐</h1>
    </div>
     -->
    
    
    
    <hr>
    <!-- <h1 class="outter-function">采用外部函数的方式</h1>
    <div id="dynamic-component-demo" class="demo">
        <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTabFunction.tabName === tab }]" @click="handleClick">
            {{ tab }}
        </button>
        <h1 class="reactive" v-if="currentTabFunctionComponent ==='tab-home'">春晓</h1>
        <h1 class="reactive" v-if="currentTabFunctionComponent ==='tab-posts'">早发白帝城</h1>
        <h1 class="reactive" v-if="currentTabFunctionComponent ==='tab-archive'">芙蓉楼送辛渐</h1>
    </div> -->
     <h1 class="outter-function">采用外部函数的方式</h1>
     <div id="dynamic-component-demo" class="demo">
         <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: isActive(tab) }]" @click="handleClick">
             {{ tab }}
         </button>
         <h1 class="reactive" v-if="currentTabFunctionComponent ==='tab-home'">春晓</h1>
         <h1 class="reactive" v-if="currentTabFunctionComponent ==='tab-posts'">早发白帝城</h1>
         <h1 class="reactive" v-if="currentTabFunctionComponent ==='tab-archive'">芙蓉楼送辛渐</h1>
     </div>
    
    
</template>

<script>
    import { defineComponent, computed, /* ref, */ reactive } from 'vue'
    export default defineComponent({
        name: 'current-click-function',
        props: {},
        setup() {
            
            
            
            // const currentTab = ref('Home')
            const tabs = ["Home", "Posts", "Archive"]
            // const currentTabComponent = computed(() => 'tab-' + currentTab.value.toLowerCase())


            // 改用 reactive
            // const currentTabReactive = reactive({ tabName: 'Home' })
            // const currentTabReactiveComponent = computed(() => {
            //     console.log('tab-' + currentTabReactive.tabName.toLowerCase())
            //     return 'tab-' + currentTabReactive.tabName.toLowerCase()
            // })
            // 采用外部函数的方式
            const currentTabFunction = reactive({ tabName: 'Home' })
            const currentTabFunctionComponent = computed(() => {
                return 'tab-' + currentTabFunction.tabName.toLowerCase()
            })
            const handleClick = (e) => {
                // console.log(e.currentTarget.innerHTML)
                currentTabFunction.tabName = e.currentTarget.innerHTML
            }
            const isActive = (tab) => {
                console.log("打印当前的tab", tab)
                // 判断是不是当前组件
                return currentTabFunction.tabName === tab
            }
            
            
            
            
            
            return { tabs,/* currentTab, currentTabComponent, currentTabReactive, currentTabReactiveComponent, */ handleClick, currentTabFunction, currentTabFunctionComponent, isActive }
        }
    })
</script>

<style lang="scss" scoped>
    // 导入 毛笔 字体
    @font-face {
        // 定义字体, format 打开字体就可以查看到格式类型
        font-family: "my-font";
        src: url("../../scss/stylesheets/my-font/经典毛笔日文字体.ttf") format("opentype");
    }

    @font-face {
        // 定义字体, format 打开字体就可以查看到格式类型
        font-family: "my-font1";
        src: url("../../scss/stylesheets/my-font/米芾毛笔字体.ttf") format("opentype");
    }
    @font-face {
        // 定义字体, format 打开字体就可以查看到格式类型
        font-family: "my-font2";
        src: url("../../scss/stylesheets/my-font/书体坊颜体.ttf") format("opentype");
    }

    .demo {
        margin: 5px;
    }

    h1 {
        font-family: my-font;
        margin: 15px;
        font-size: 72px;
        color: red;

        &.reactive {
            font-family: my-font1;
            margin: 15px;
            font-size: 72px;
            color: green;
        }
        &.outter-function {
            font-family: my-font2;
            margin: 15px;
            font-size: 72px;
            color: green;
        }
    }

    .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
    }

    .tab-button:hover {
        background: #e0e0e0;
    }

    .tab-button.active {
        background: #e0e0e0;
    }

    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
</style>