<template>
    <div id="div1">
        <img id="drag1" src="./w3school.gif" />
    </div>
    <div id="div2"></div>
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'drag-event',
        props: {},
        setup() {
            const useDrag = () => {
                const dragstart = (e) => {
                    console.log("01, 当选中或者拖动时触发")
                    e.dataTransfer.setData('Text', e.target.id)
                }
                const dragover = e => {
                    e.preventDefault()
                }
                const drop = e => {
                    e.preventDefault()
                    const data = e.dataTransfer.getData('Text')
                    e.target.appendChild(document.getElementById(data).cloneNode())
                }
                onMounted(() => {
                    const element = document.querySelector('#drag1')
                    const div1 = document.querySelector('#div1')
                    const div2 = document.querySelector('#div2')
                    //! 1. 拖动元素时触发的事件
                    element.addEventListener('dragstart', dragstart)
                    // element.addEventListener('drag', drag)
                    //! 松开鼠标时触发, 不管有没有移动好 都会触发
                    // element.addEventListener('dragend', dragend)
                    //! 不管有没有释放成功都会触发, 只要移动一点都会触发
                    //! 因为容器本身也可以放置
                    // element.addEventListener('dragenter', dragenter)
                    element.addEventListener('dragexit', dragexit)
                })
                function dragexit(){
                    console.log("05, 当元素变得不再是拖拽操作的选中目标时触发。")
                }
                function dragenter(){
                    console.log("04, 当拖拽元素或选中的文本到一个可释放目标时触发")
                }
                function dragend(){
                    console.log("03, 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). ")
                }
                function drag(){
                    // 与 dragstart 不同, 这个会一直触发
                    console.log("02, 当拖拽元素或选中的文本时触发。")
                }
            }
            useDrag()
            return {}
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