<template>
    <defs>
        <filter id="drop-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="-2" dy="2" result="offsetBlur" />
            <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
    <g id="" filter="url(#drop-shadow)">
        <path :id="`triangle-pin-${index}`" :d="trianglePin" v-for="(trianglePin, index) in trianglePins" :key="index" fill="red" stroke="red" />
    </g>
</template>

<script>
    import { defineComponent, ref, inject } from 'vue'
    import { multiplePins, usePins } from "../utils";
    export default defineComponent({
        name: 'triangle-pin',
        props: {},
        setup() {
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { node, centerPoint, r } = inject(dashboardSymbol)
            // 表针参数
            const gp = { w: 2, h: 0.618 * r, l: 0.20 * r, } // l 包含圆头的长度
            const points = [
                { operator: 'M', x: -gp.w / 2, y: -gp.h },
                { operator: 'L', x: 0, y: -gp.l - gp.h },
                { operator: 'L', x: gp.w / 2, y: -gp.h },
                { operator: 'L', x: -gp.w / 2, y: -gp.h }
            ]
            const angles = ref([0])
            const trianglePins = ref([])
            trianglePins.value = multiplePins(points, centerPoint, angles.value)
            usePins(node, points, trianglePins, centerPoint, angles, 'triangle-pin')

            return { trianglePins }
        }
    })
</script>

<style lang="scss" scoped>

</style>