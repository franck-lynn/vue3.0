<template>
    <div id="div1">
        <img id="drag1" src="./w3school.gif" />
    </div>
    <div id="div2"></div>
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'what-dragable',
        props: {},
        setup() {
            // https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
            const useDarg = () => {
                const dragstart = (e) => {
                    //! 开始拖动时要干的事情
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

                    element.addEventListener('dragstart', dragstart)
                    div1.addEventListener('dragover', dragover)
                    div2.addEventListener('dragover', dragover)
                    div1.addEventListener('drop', drop)
                    div2.addEventListener('drop', drop)
                })
            }
            useDarg()
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