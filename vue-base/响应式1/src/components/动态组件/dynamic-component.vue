<template>
    <div>
        <div id="dynamic-component-demo" class="demo">
            <!--  -->
            <button v-for="tab in tabs" :key="tab" :class="['tab-button', {active: currentTab === tab}]" @click="currentTab = tab">
                {{tab}}
            </button>
        </div>
        <!-- 会变换成动态的 自定义组件 -->
        <component :is="currentTabComponent" class="tab"></component>
        
        <hr>
        <!-- 获取当前点击的元素 -->
        <button v-for="tab in otherTabs" :key="tab" :class="['tab-button', {active: currentTab === tab}]" @click="getCurrentTab">
            {{tab}}
        </button>
    </div>
</template>

<script>
    import { defineComponent, ref, computed } from 'vue'
    export default defineComponent({
        name: 'dynamic-component',
        props: {},
        // https://v3.vuejs.org/guide/component-dynamic-async.html#dynamic-components-with-keep-alive
        // 自定义组件并注册
        //! 在 vuer-plugin.js 文件中, 已经自动注册了组件了
        // components: {
        // 'tab-home': { template: `<div class="demo-tab">Home component</div>` }
        // },
        setup() {
            const currentTab = ref('Home')
            const tabs = ref(['Home', 'Posts', 'Archive'])
            const currentTabComponent = computed(
                () => {
                    // 当前的元素变化了, 重新进行计算
                    console.log("01, 当前点击的元素---> ", currentTab.value)
                    return 'tab-' + currentTab.value.toLowerCase()
                }
            )
            // ---------------------------------------------
            const otherTabs = ref(['主页', '提交', '附件'])
            const getCurrentTab = (e) => {
                // console.log(e.target)
                console.log("当前点击的标签->>>", e.currentTarget)
            }
            return { tabs, currentTab, currentTabComponent, otherTabs, getCurrentTab }
        }
    })
</script>

<style lang="scss" scoped>
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