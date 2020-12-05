<template>
    <!-- <div :style="`transform:rotate(${Math.atan2(point.im, point.re)* 180/Math.PI}deg)`">
    </div> -->
    <div :style="`transform:rotate(${Math.atan2(pt.im, pt.re)* 180/Math.PI}deg);`"> {{Math.atan2(pt.im, pt.re)* 180/Math.PI}}
    </div>
</template>

<script>
    import { complex, multiply, cos, sin } from 'mathjs'
    import { defineComponent, onMounted, reactive } from 'vue'
    export default defineComponent({
        name: 'rotation-div',
        props: {},
        setup() {
            // 让div的中心点 绕指定点旋转一定的角度, 中心点与指定点的连线与 x 轴构成起始角, 
            // 鼠标点移动后与中心点连线构成结束角
            const useRotationDiv = () => {
                //! 对于用 ref 定义的响应式数据, 里面是对象的话, 要想设定好属性, 也就是说要有初始的值
                const point = reactive(complex(0, 0))
                onMounted(() => {
                    const div = document.querySelector('div')
                    div.addEventListener('mousedown', startRotation)
                })

                function startRotation() {
                    document.documentElement.addEventListener('mousemove', onRotation)
                    document.documentElement.addEventListener('mouseup', onStopRotation)
                }

                function onRotation(e) {
                    const { left, top, width, height } = document.querySelector('div').getBoundingClientRect()
                    // 默认的旋转中心点 在 div 的左边距中点位置
                    // const centerPoint = complex(left, top + height / 2)
                    // 起始的矢量
                    // const startVector = complex(left + width/2 -left, top + height / 2 - top)
                    let θ = Math.atan2((e.pageY - top - height / 2), (e.pageX - left - width / 2))
                    // point.value = multiply(complex(cos(θ), sin(θ)), complex(width / 2, height / 2))
                    const r = multiply(complex(cos(θ), sin(θ)), complex(width / 2, height / 2))
                    point.re = r.re
                    point.im = r.im
                }

                function onStopRotation() {
                    // currentPoint.value = point.value
                    document.documentElement.removeEventListener('mousemove', onRotation)
                    document.documentElement.removeEventListener('mouseup', onStopRotation)
                }
                // console.log("返回的值: ", Math.atan2(point.value.im ,point.value.re) * 180/Math.PI)
                // console.log("返回的值: ", point)
                // return Math.atan2(point.im ,point.re) * 180/Math.PI
                return point // 必须要返回的是响应式的对象
            }

            const pt = useRotationDiv()
            return { pt }
        }
    })
</script>

<style lang="scss" scoped>
    div {
        width: 100px;
        height: 40px;
        background-color: red;
    }
</style>