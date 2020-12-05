<template>

    <!-- 拖动div -->
    <div class="panel">可拖动</div>
    <div class="x"></div>
    <div class="y"></div>
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'drag-div',
        props: {},
        setup() {
            const usedragX = () => {
                // 定义要改变的变量的响应式数据, 哪个要改变, 就设置为响应式的.
                // 例如: 宽度 和 高度 要改变, 就设置这个为响应式的
                const width = ref()
                const maginLeft = ref()
                // 记录鼠标的位置
                const startX = ref()
                // 辅助函数, 获取 panel div 的数据

                const getPanelWidth = () => parseInt((getComputedStyle(document.querySelector('.panel')).width), 10)
                const getXMarginLeft = () => parseInt((getComputedStyle(document.querySelector('.x')).marginLeft), 10)

                onMounted(() => {
                    // width.value = getPanelWidth()
                    // 监听事件
                    document.querySelector('.x').addEventListener('mousedown', startDrag)

                })

                function startDrag(e) {
                    console.log("也触发了!!!!!!!!!!")
                    // 获取当前的div的宽度
                    width.value = getPanelWidth()
                    maginLeft.value = getXMarginLeft()

                    startX.value = e.clientX

                    // 触发移动事件
                    document.documentElement.addEventListener('mousemove', onDrag)
                    document.documentElement.addEventListener('mouseup', stopDrag)
                }

                function onDrag(e) {
                    let newWidth = width.value + e.clientX - startX.value
                    const xWidth = parseInt((getComputedStyle(document.querySelector('.x')).width), 10) // 数据没变化, 所以不用响应式的
                    if (newWidth > xWidth) {
                        // 改变 div 的宽度
                        document.querySelector('.panel').style.width = newWidth + 'px'
                        document.querySelector('.y').style.width = newWidth + xWidth + 'px'
                        document.querySelector('.x').style.marginLeft = (maginLeft.value + e.clientX - startX.value) + 'px'
                    }
                }

                function stopDrag() {
                    document.documentElement.removeEventListener('mousemove', onDrag)
                    document.documentElement.removeEventListener('mouseup', stopDrag)
                }
            }


            const usedragY = () => {
                // 定义要改变的变量的响应式数据, 哪个要改变, 就设置为响应式的.
                // 例如: 宽度 和 高度 要改变, 就设置这个为响应式的
                const height = ref()
                const maginTop = ref()
                // 记录鼠标的位置
                const startY = ref()
                // 辅助函数, 获取 panel div 的数据

                const getPanelHeight = () => parseInt((getComputedStyle(document.querySelector('.panel')).height), 10)
                const getYMarginTop = () => parseInt((getComputedStyle(document.querySelector('.y')).marginTop), 10)

                onMounted(() => {
                    // width.value = getPanelWidth()
                    // 监听事件
                    document.querySelector('.y').addEventListener('mousedown', startDrag)

                })

                function startDrag(e) {

                    // 获取当前的div的宽度
                    height.value = getPanelHeight()
                    maginTop.value = getYMarginTop()
                    startY.value = e.clientY

                    // 触发移动事件
                    document.documentElement.addEventListener('mousemove', onDrag)
                    document.documentElement.addEventListener('mouseup', stopDrag)
                }

                function onDrag(e) {
                    let newHeight = height.value + e.clientY - startY.value
                    const yHeight = parseInt((getComputedStyle(document.querySelector('.y')).height), 10) // 数据没变化, 所以不用响应式的
                    if (newHeight > yHeight) {
                        // 改变 div 的高度
                        document.querySelector('.panel').style.height = newHeight + 'px'

                        document.querySelector('.x').style.height = newHeight + yHeight + 'px'
                        // document.querySelector('.y').style.marginLeft = (maginTop.value + e.clientX - startX.value) + 'px'
                    }
                }

                function stopDrag() {
                    document.documentElement.removeEventListener('mousemove', onDrag)
                    document.documentElement.removeEventListener('mouseup', stopDrag)
                }
            }
            usedragY()
            usedragX()
            return {}
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

    // 定义变量
    $marginLeft: 100px;
    $marginTop: 50px;
    $width: 200px;
    $height: 100px;
    $xWidth: 4px;
    $yHeight: 4px;

    // 设置好布局
    .panel {
        width: $width;
        height: $height;
        background-color: yellowgreen;
        line-height: $height;
        text-align: center;
        margin-left: $marginLeft;
        margin-top: $marginTop;
        font-size: 36px;
    }

    .x {
        position: absolute;
        width: $xWidth;
        height: $height;
        background-color: rebeccapurple;
        left: $marginLeft + $width;
        top: $marginTop;
    }

    .y {
        position: absolute;
        width: $width+ $xWidth;
        background-color: royalblue;
        height: $yHeight;
        margin-left: $marginLeft;
    }
</style>