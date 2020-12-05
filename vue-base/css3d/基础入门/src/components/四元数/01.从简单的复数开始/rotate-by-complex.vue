<template>
    <div></div>
    <svg width="400" height="400">
        <circle cx="200" cy="200" r="120" fill="none" stroke="blue"></circle>
        <line x1="200" y1="200" :x2="point.re+200" :y2="point.im+200" stroke-width="6" stroke="green"> </line>
        <circle id="lc" :cx="point.re+200" :cy="point.im +200" r="12" fill="red" stroke="none"></circle>
    </svg>

</template>

<script>
    import { complex, multiply, cos, sin } from 'mathjs'
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'rotate-by-complex',
        props: {},
        setup() {

            const useRotation = () => {
                const point = ref(complex(120, 0)) // 表示在数学坐标系下的一个复数,在 x 轴上 100 点处
                
                onMounted(() => {
                    const lc = document.querySelector('#lc')
                    // console.log("01. 初始状态的实部和虚部:", point.value.re, point.value.im)
                    lc.addEventListener('mousedown', startRotation) // 在 小圆点上施加监听事件
                })

                function startRotation() {
                    document.documentElement.addEventListener('mousemove', onRotation)
                    document.documentElement.addEventListener('mouseup', onStopRotation)
                }

                function onRotation(e) {
                    //! 获取 svg 在网页中相对于 屏幕坐标系的坐标和svg的宽高, 非常需要注意的一个细节
                    const {left, top, width, height} = document.querySelector('svg').getBoundingClientRect()
                    //! 之所以会出现跳跃, 是因为上面增加了一个 div 的标签, 屏幕坐标系中的鼠标点坐标是指整个
                    //! 屏幕的坐标, 原点在 浏览器的左上角, 增加了这个div的高度.鼠标移动时角度就变了, 减掉这个高度就好了
                    let θ = Math.atan2((e.pageY - top - height / 2), (e.pageX - left - width / 2)) 
                    //! 每次旋转的时候都是在起点的位置, 
                    console.log("获取并设置小圆点的起始位置的复数", document.querySelector('svg').childNodes[0].getAttribute('r'))
                    const circleRadius = document.querySelector('svg').childNodes[0].getAttribute('r')
                    point.value = multiply(complex(cos(θ), sin(θ)), complex(circleRadius, 0))
                }

                function onStopRotation() {
                    // currentPoint.value = point.value
                    document.documentElement.removeEventListener('mousemove', onRotation)
                    document.documentElement.removeEventListener('mouseup', onStopRotation)
                }
                // console.log("是否异步?", point.value.re)
                return point
            }
            const point = useRotation()
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