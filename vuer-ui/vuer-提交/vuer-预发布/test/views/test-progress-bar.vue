<template>
    <div class="row">
        <h1>测试进度条</h1>
        <vuer-progress-bar-step></vuer-progress-bar-step>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-progress-bar',
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .row {
        width: 400px;
        .vuer-button {
            margin-right: 20px;
        }
    }
</style>