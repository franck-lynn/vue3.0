<template>
    <div id="move" style="width: 100px; height: 40px; background-color: green" 
      :style="{'margin-left': point.re + 'px', 'margin-top': point.im + 'px'}">
        x: {{point.re}}-- y: {{point.im}}
    </div>
</template>

<script>
    import { add, complex } from 'mathjs'
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'move-by-complex',
        props: {},
        setup() {
            const useMove = () => {
                // 定义一个复数
                const point = ref(complex(0, 0))
                onMounted(() => {
                    const div = document.querySelector('#move')
                    div.addEventListener('mousedown', startDrag)
                })

                function startDrag() {
                    document.documentElement.addEventListener('mousemove', onDrag)
                    document.documentElement.addEventListener('mouseup', onStopDrag)
                }

                function onDrag(e) {
                    // 开始移动啦, 前面都是为移动做的准备
                    //! 获取 div 标签的 屏幕坐标系中的位置和 div 宽高
                    // console.log(document.querySelector('#move').getBoundingClientRect())
                    //! 我只关心 这几个值
                    const { width, height } = document.querySelector('#move').getBoundingClientRect()
                    //! 每次都是从屏幕坐标系原点开始移动, 复数相加, (-width/ 2, -height / 2) 是将移动的起始点放在div 的中心
                    point.value = add(complex(e.pageX, e.pageY), complex(-width / 2, -height / 2))
                }

                function onStopDrag() {
                    // 清除掉这2个监听, 加载时的监听要等卸载时再去打, 不然, 再移动时就监听不到了
                    // 卸载时所有的监听都要去掉
                    document.documentElement.removeEventListener('mousemove', onDrag)
                    document.documentElement.removeEventListener('mouseup', onStopDrag)
                }
                return point
            }
            const point = useMove()
            return { point }
        }
    })
</script>

<style lang="scss" scoped>
    * {
        -moz-user-select: none; // 设置不选中文字
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
</style>