<template>
    <!-- <div id="move" style="background-color: red" 
      :style="{'margin-left': marginLeft + 'px','margin-top': marginTop + 'px', width: width + 'px', height: height + 'px'}"></div> -->
    <div id="move" style="width: 100px; height: 40px; background-color: red"></div>
</template>

<script>
    import { complex, add } from 'mathjs'
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'move-complex',
        props: {},
        setup() {
            // 复数相加有平移效果, 现在测试一下: 
            // 定义一个平移的复数函数
            const moveComplex = (a, b) => add(a, b)

            const useMove = () => {
                const point = ref()
                // 中间变量
                const startX = ref()
                const startY = ref()


                onMounted(() => {
                    const div = document.querySelector('#move')
                    // 监听鼠标按下事件
                    div.addEventListener('mousedown', startDrag)
                })

                function startDrag() {
                    // 起始位置在当前 div的中间位置, 
                    const marginLeft = parseInt(getComputedStyle(document.querySelector('#move')).marginLeft, 10)
                    const marginTop = parseInt(getComputedStyle(document.querySelector('#move')).marginTop, 10)
                    startX.value = marginLeft
                    startY.value = marginTop
                    // 监听鼠标移动事件
                    document.documentElement.addEventListener('mousemove', onDrag)
                    document.documentElement.addEventListener('mouseup', onStopDrag)
                }

                function onDrag(e) {
                    // 当前鼠标位置 + 移动前的鼠标位置
                    point.value = moveComplex(
                        complex(startX.value, startY.value), // 起始点
                        complex(e.pageX - startX.value, e.pageY - startY.value) // 结束点
                    )
                    const width = parseInt(getComputedStyle(document.querySelector('#move')).width, 10)
                    const height = parseInt(getComputedStyle(document.querySelector('#move')).height, 10)

                    document.querySelector('#move').style.marginLeft = point.value.re - width / 2 + 'px'
                    document.querySelector('#move').style.marginTop = point.value.im - height / 2 + 'px'
                }

                function onStopDrag() {
                    document.documentElement.removeEventListener('mousemove', onDrag)
                    document.documentElement.removeEventListener('mouseup', onStopDrag)
                }
                return point
            }
            const point = useMove()
            console.log(point.re)
            // const styleObj = {
            //     'margin-left': point.re + 'px',
            //     'margin-top': point.im + 'px'
            // }


            return {}
        }
    })
</script>

<style lang="scss" scoped>
    // #move {
    //     width: 100px;
    //     height: 40px;
    //     background-color: red;
    // }
</style>