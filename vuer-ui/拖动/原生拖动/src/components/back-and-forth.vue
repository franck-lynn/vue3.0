<template>
    <div id="div1" @drop="drop" @dragover="dragover">
        <img id="drag1" src="./w3school.gif" draggable="true" @dragstart="dragstart" />
    </div>
    <div id="div2" @drop="drop" @dragover="dragover"></div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'back-and-forth',
        props: {},
        setup() {
            //! 设置拖动的数据
            const dragstart = e => {
                e.dataTransfer.setData('Text', e.target.id)
            }
            //! 允许元素放在何处?
            const dragover = e => e.preventDefault() // 组织元素的默认行为, 让元素可以放进这里面来
            //! 放置什么东西到元素里面也要说下的
            const drop = e => {
                e.preventDefault()
                const data = e.dataTransfer.getData('Text')
                e.target.appendChild(document.getElementById(data))
            }
            return {dragstart, dragover, drop}
        }
    })
</script>

<style lang="scss" scoped>
    #div1,
    #div2 {
        float: left;
        width: 198px;
        height: 66px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #aaaaaa;
    }
</style>