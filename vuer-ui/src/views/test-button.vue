<template>
    <div class="row">
        <h3>按钮</h3>
        <h4>普通按钮</h4>
        <vuer-button @click="fn">按钮</vuer-button>
        <h4>type 属性</h4>
        <vuer-button type="primary" @click="fn">primary</vuer-button>
        <vuer-button type="success">success</vuer-button>
        <vuer-button type="info">info</vuer-button>
        <vuer-button type="warning">warning</vuer-button>
        <h4>plain 属性</h4>
        <vuer-button plain type="primary" @click="fn">primary</vuer-button>
        <vuer-button plain type="success">success</vuer-button>
        <vuer-button plain type="info">info</vuer-button>
        <vuer-button plain type="warning">warning</vuer-button>
        <h4>round 属性</h4>
        <vuer-button plain round type="primary" @click="fn">primary</vuer-button>
        <vuer-button plain round type="success">success</vuer-button>
        <vuer-button plain round type="info">info</vuer-button>
        <vuer-button plain round type="warning">warning</vuer-button>
        <h4>round 属性</h4>
        <vuer-button plain circle type="primary" @click="fn">primary</vuer-button>
        <vuer-button plain circle type="success">success</vuer-button>
        <vuer-button plain circle type="info">info</vuer-button>
        <vuer-button plain circle type="warning">warning</vuer-button>

        <h4>icon 属性</h4>
        <vuer-button plain circle icon="icon-key" type="primary" @click="fn"></vuer-button>
        <vuer-button plain circle icon="icon-chart-relation" type="success"></vuer-button>
        <vuer-button plain circle icon="icon-chart-scatter-plot" type="info"></vuer-button>
        <vuer-button plain circle icon="icon-chart-bar" type="warning"></vuer-button>
        <vuer-button circle icon="icon-all-fill" type="warning"></vuer-button>
        <vuer-button circle icon="icon-paperplane-fill" type="warning"></vuer-button>
        <vuer-button circle icon="icon-question-circle" type="warning"></vuer-button>

        <h4>plain 属性, 既传文字又传图标</h4>
        <vuer-button plain icon="icon-password-not-view" type="primary" @click="fn">primary</vuer-button>
        <vuer-button plain icon="icon-password-visible" type="success">success</vuer-button>
        <vuer-button plain icon="icon-cancel" type="info">info</vuer-button>
        <vuer-button plain icon="icon-poweroff" type="warning">warning</vuer-button>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-button',
        components: {},
        props: {},
        setup() {
            const fn = (e) => {
                // 通知子组件, 父组件要进行触发
                console.log("子组件触发这个事件, ", e)
            }
            return {
                fn
            }
        }
    })
</script>

<style lang="scss" scoped>
    .row {
        .vuer-button {
            margin-right: 20px;
        }
    }
</style>