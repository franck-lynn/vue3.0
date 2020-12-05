<template>
    <!-- 本例演示复数的加法 -->
    <svg width="600" height="600">

        <line :x1="vectorOA.startPoint.x" :y1="vectorOA.startPoint.y" :x2="vectorOA.endpoint.x" :y2="vectorOA.endpoint.y" stroke="red"> </line>
        <line :x1="vectorOB.startPoint.x" :y1="vectorOB.startPoint.y" :x2="vectorOB.endpoint.x" :y2="vectorOB.endpoint.y" stroke="red"> </line>
        <line :x1="centerPoint.x" :y1="centerPoint.y" :x2="AB.x" :y2="AB.y" stroke="green"> </line>
        <line :x1="centerPoint.x" :y1="centerPoint.y" :x2="BA.x" :y2="BA.y" stroke="green"> </line>
        <line :x1="centerPoint.x" :y1="centerPoint.y" :x2="rotatedOAInScreen.x" :y2="rotatedOAInScreen.y" stroke="blue"> </line>
    </svg>
</template>

<script>
    import { complex, add, subtract, multiply } from 'mathjs'

    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'add-complex',
        props: {},
        setup() {
            const centerPoint = { x: 200, y: 200 } // 数学坐标系中的原点坐标
            const vectorOA = {
                startPoint: { x: centerPoint.x, y: centerPoint.y },
                endpoint: { x: centerPoint.x + 100, y: centerPoint.y + 40 }
            }
            const vectorOB = {
                startPoint: { x: centerPoint.x, y: centerPoint.y },
                endpoint: { x: centerPoint.x + 40, y: centerPoint.y + 80 }
            }
            // 构造一个复数
            const oa = complex(vectorOA.endpoint.x - vectorOA.startPoint.x, vectorOA.endpoint.y - vectorOA.startPoint.y)
            const ob = complex(vectorOB.endpoint.x - vectorOB.startPoint.x, vectorOB.endpoint.y - vectorOB.startPoint.y)
            const ab = add(ob, oa)
            const AB = { x: ab.re + centerPoint.x, y: ab.im + centerPoint.y }
            // 相减的结果
            const ba = subtract(oa, ob)
            const BA = { x: ba.re + centerPoint.x, y: ba.im + centerPoint.y }
            // 把 oa 向量旋转 45°
            // 复数的旋转公式 v' = z * v = z ( cos(θ)+ i sin(theta))
            // 定义旋转复数
            const rotationComplex = complex(Math.cos(45 * Math.PI / 180), Math.sin(45 * Math.PI / 180))
            console.log(rotationComplex, oa)
            const rotatedOA = multiply(oa, rotationComplex)
            // 转到屏幕坐标系
            const rotatedOAInScreen = { x: rotatedOA.re + centerPoint.x , y: rotatedOA.im + centerPoint.y}
            return { centerPoint, vectorOA, vectorOB, AB, BA, rotatedOAInScreen }
        }
    })
</script>

<style lang="scss" scoped>
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