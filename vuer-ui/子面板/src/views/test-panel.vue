<template>
    <!-- <h1>测试子面板</h1> -->
    <panel :name=name1></panel>
   
    <panel :name=name2></panel>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-panel',
        props: {},
        setup() {
            const name1 = "标题名称: edit table"
            const name2 = "表头2"
            return { name1, name2 }
        }
    })
</script>

<style lang="scss" scoped>
    h1 {
        margin: 25px;
    }

    .is-min {
        // border: 1px solid red;
        // display: flex;
        // display: block;
        // flex-direction: column;
        clear: both;
        // margin-top: 5px;
    }
</style>