<template>
    <defs>
        <filter id="innershadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="15" result="blur"></feGaussianBlur>
            <feOffset in="blur" dx="4" dy="4" result="offsetBlur"></feOffset>
            <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="SourceGraphic" />

            </feMerge>
        </filter>
    </defs>
    
    
    <!-- 最外圈的那个圆 -->
    <g id="central-circle" filter="url(#innershadow)">
        <circle :cx="centerPoint.x" :cy="centerPoint.y" :r="r" :style="`stroke-width: ${strokeWidth}`"></circle>
    </g>
</template>

<script>
    import { defineComponent, inject } from 'vue'
    export default defineComponent({
        name: 'central-circle',
        props: {},
        setup() {
            // 父组件注入的数据
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { centerPoint, r, strokeWidth } = inject(dashboardSymbol)
            return { centerPoint, r, strokeWidth }
        }
    })
</script>

<style lang="scss" scoped>
    circle {
        // fill: #DDE1E3;
        fill: none;
        stroke: #021F33;
    }
</style>