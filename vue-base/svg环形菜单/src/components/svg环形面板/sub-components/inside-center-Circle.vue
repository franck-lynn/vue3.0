<template>
    <g id="inside-center-circle">
        <!-- 内测的中心圆 -->
        <circle id="icc" :cx="icc.centerPoint.x" :cy="icc.centerPoint.y" :r="icc.r" :style="`stroke-width: ${strokeWidth}`"></circle>
        <minor-circle :iccR="icc.r"></minor-circle>
    </g>
</template>

<script>
    import { defineComponent, inject } from 'vue'
    export default defineComponent({
        name: 'inner-Circle',
        props: {},
        setup() {
            // icc = insideCenterCircle
            const strokeWidth = 1
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { centerPoint, r } = inject(dashboardSymbol)
            // 内部的中心圆参数
            const icc = {
                centerPoint: { x: centerPoint.x, y: centerPoint.y },
                r: 0.618 * r
            }


            return { icc, strokeWidth }
        }
    })
</script>

<style lang="scss" scoped>
     #icc{
         stroke: #253F50;
         fill: #BACAD3;
     }
    // #inside-center-circle {
    //     stroke: red;
    //     fill: none;
    // }
</style>