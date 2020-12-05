<template>
    <div id="div1" @drop="drop" @dragover="allowDrop"></div>
    <img id="drag1" src="./w3school.gif" draggable="true" @dragstart="drag" />
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'simple-drag',
        props: {},
        setup() {
            /*
            简单原生拖动总结: 
            ! 1. 设置元素可拖动,  dragable="true", 要拖动元素, 首先要让这个元素可拖动
            ! 2. 拖动什么? dragstart, 规定被拖动元素 会发生什么, 监听 dragStart属性时, 会调用一个函数 drag
            !    dataTransfer.setData() 方法设置 被拖动数据的类型和值 
            ?    dataTransfer 对象用于保存 拖动和放下过程中的数据, 在 event 中有这个对象
            ! 3. 放到何处? dragover 就是解决这个问题的, 默认地, 
            !    无法将数据放置到其他元素中, 如果需要元素放置, 就要阻止元素的默认处理方式
            ! 4. 进行放置, drop, 定义 drop 过程中会发生的事情
            */
            const drag = (ev) => {
                ev.dataTransfer.setData("Text", ev.target.id);
            }
            const drop = e => {
                e.preventDefault()
                const data = e.dataTransfer.getData('Text') // data里保存的是 元素的id, 再根据 id 获取这个元素
                e.target.appendChild(document.getElementById(data))
            }
            const allowDrop = e => {
                e.preventDefault()
            }
            return { drag, drop, allowDrop }
        }
    })
</script>

<style lang="scss" scoped>
    #div1 {
        width: 198px;
        height: 66px;
        padding: 10px;
        border: 1px solid red;
    }
</style>