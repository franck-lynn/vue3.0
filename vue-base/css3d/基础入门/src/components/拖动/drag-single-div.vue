<template>
    <div id="box"><span id="x">x: {{width}} </span> <span id="y">y: {{height}} </span> </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { useDragWidth, useDragHeight } from "./use-dragable";
    export default defineComponent({
        name: 'drag-single-div',
        props: {},
        setup() {

            const width = useDragWidth()
            const height = useDragHeight()
            return { width, height }
        }
    })
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }

    * {
        -moz-user-select: none; // 设置不选中文字
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    div {
        width: 200px;
        height: 100px;
        background-color: greenyellow;

        #x {
            cursor: pointer;
        }
    }
</style>