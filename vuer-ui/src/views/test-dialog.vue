<template>
    <div>
        <h3>对话框</h3>
        <vuer-button type="primary" @click="visible=true">显示对话框</vuer-button>
        <!-- <vuer-dialog title="温馨提示"></vuer-dialog> -->

        <!-- 控制标题 -->
        <!-- 
        <vuer-dialog>
            <template v-slot:title>
                <h3>我是标题</h3>
            </template>
        </vuer-dialog>
         -->
        <!-- <vuer-dialog width="80%" top="100px" :visible="visible" @close="close"> -->
        <!-- 相当于做了 2件事情 :visible=visible @update:visible=fn -->
        <!-- .sync 修饰符 在 vue3.0 中失效了? -->
        <!-- <vuer-dialog width="80%" top="100px" :visible.sync="visible"> -->
        <vuer-dialog width="80%" top="100px" v-model:visible="visible">
            <ul>
                <li>1, 对话框的内容...</li>
                <li>2, 对话框的内容...</li>
                <li>3, 对话框的内容...</li>
            </ul>
            <template v-slot:footer>
                <vuer-button type="primary">确定</vuer-button>
                <vuer-button>取消</vuer-button>
            </template>
        </vuer-dialog>

    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-dialog',
        components: {},
        props: {},
        setup() {
            const visible = ref(false)
            const close = (value) => {
                console.log("子组件发射过来的事件", value)
                visible.value = value
            }
            return {
                visible,
                close
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>