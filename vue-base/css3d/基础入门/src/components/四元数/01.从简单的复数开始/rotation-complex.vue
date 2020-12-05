<template>
    <div></div>
    <svg width="400" height="400">
        <circle cx="200" cy="200" r="100" fill="none" stroke="blue"></circle>

        <line x1="200" y1="200" :x2="point.re+200" :y2="point.im+200" stroke-width="6" stroke="green"> </line>
        <circle id="lc" :cx="point.re+200" :cy="point.im +200" r="12" fill="red" stroke="none"></circle>
    </svg>

</template>

<script>
    import { complex, multiply, cos, sin } from 'mathjs'
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'rotation-complex',
        props: {},
        setup() {

            const useRotation = () => {
                // 使用复数进行旋转
                // 定义一个响应式的复数
                const point = ref(complex(100, 0)) // 表示在数学坐标系下的一个复数,在 x 轴上 100 点处

                // 定义一个中间复数变量表示当前的 复数
                // const currentPoint = ref(complex(0, 0))
                onMounted(() => {
                    const lc = document.querySelector('#lc')
                    // console.log("01. 初始状态的实部和虚部:", point.value.re, point.value.im)
                    lc.addEventListener('mousedown', startRotation)
                })

                function startRotation() {
                    // 保存当前的其实状态复数, 
                    // currentPoint.value = point.value
                    // console.log("02. 当前点的复数: ", currentPoint.value)
                    document.documentElement.addEventListener('mousemove', onRotation)
                    document.documentElement.addEventListener('mouseup', onStopRotation)
                }

                function onRotation(e) {
                    // console.log("01. page坐标", e.pageX, e.pageY)
                    // console.log("02. clientX坐标", e.clientX, e.clientY)
                    //! 获取 svg 在网页中相对于 屏幕坐标系的坐标和svg的宽高, 非常需要注意的一个细节
                    const {left, top, width, height} = document.querySelector('svg').getBoundingClientRect()
                    // console.log("03. 获取 svg 的offset", offset)
                    // 在当前的复数状态下再乘以一个旋转复数
                    // 旋转的角度差 是当前鼠标的位置与原点连线 与 x 轴的夹角 - 初始的角度
                    // const Δθ = Math.atan2(e.pageY - 200, e.pageX - 200) - Math.atan2(currentPoint.value.im, currentPoint.value.re)
                    //! 之所以会出现跳跃, 是因为上面增加了一个 div 的标签, 屏幕坐标系中的鼠标点坐标是指整个
                    //! 屏幕的坐标, 原点在 浏览器的左上角, 增加了这个div的高度.鼠标移动时角度就变了, 减掉这个高度就好了
                    let θ = Math.atan2((e.pageY - top - height / 2), (e.pageX - left - width / 2)) 
                    // console.log(Math.floor(θ * 180 / Math.PI, 0))
                    // 旋转的复数 complex(cos(Δθ), sin(Δθ))
                    // point.value = multiply(currentPoint.value, complex(cos(Δθ), sin(Δθ)))
                    point.value = multiply(complex(cos(θ), sin(θ)), complex(100, 0))
                }

                function onStopRotation() {
                    // currentPoint.value = point.value
                    document.documentElement.removeEventListener('mousemove', onRotation)
                    document.documentElement.removeEventListener('mouseup', onStopRotation)
                }
                return point
            }

            const point = useRotation()
            // console.log(point)
            /*
                        const cx = ref(300)
                        const cy = ref(200)

                        const startAngle = ref()

                        onMounted(() => {
                            const lc = document.querySelector('#lc')
                            // 初始化时的角度
                            startAngle.value = Math.atan2(cy.value - 200, cx.value - 200)
                            console.log("初始时的角度应该为零", startAngle.value)
                            // 准备旋转
                            lc.addEventListener('mousedown', startRotation)
                        })

                        function startRotation(e) {
                            // 获取当前的角度
                            startAngle.value = Math.atan2(e.pageY - 200, e.pageX - 200)
                            // console.log("开始移动前的角度", startAngle.value)
                            // 获取当前坐标点对应的复数
                            document.documentElement.addEventListener('mousemove', onRotation)
                            document.documentElement.addEventListener('mouseup', onStopRotation)
                        }

                        function onRotation(e) {
                            // 旋转 Θ 角 = 当前角度 - 旋转前的角度
                            const deltaAngle = Math.atan2(e.pageY - 200, e.pageX - 200) - startAngle.value
                            // 进行复数相乘, 乘以这个复数 complex(cos(deltaAngle), sin(deltaAngle))
                            // 当前向量变成了 
                            const a = multiply(complex(100, 0), complex(cos(deltaAngle), sin(deltaAngle)))
                            cx.value = a.re + 200
                            cy.value = a.im + 200
                        }

                        function onStopRotation(e) {
                            startAngle.value = Math.atan2(e.pageY - 200, e.pageX - 200)
                            document.documentElement.removeEventListener('mousemove', onRotation)
                        }
                        */
            return { point }
        }
    })
</script>

<style lang="scss" scoped>
    div {
        width: 100px;
        height: 40px;
        background-color: red;
    }

    * {
        box-sizing: border-box;
    }

    svg {
        -moz-user-select: none; // 设置不选中文字
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    svg {
        border: 1px solid #eee;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
    }
</style>