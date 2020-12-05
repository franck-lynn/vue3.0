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
        <path :id="`color-pin-${index}`" :d="colorPin" v-for="(colorPin, index) in colorPins" :key="index" fill="" />
        <dynamic-arc :startAngle="startAngle" :dynamicAngle="dynamicAngle"></dynamic-arc>
    </g>
</template>

<script>
    import { defineComponent, ref, inject } from 'vue'
    import { multiplePins, usePins, getAngles } from "../utils";
    export default defineComponent({
        name: 'color-pins',
        props: {},
        setup() {
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { node, centerPoint, r, strokeWidth, data } = inject(dashboardSymbol)

            // 描述 color-pins 的点
            const cp = { w: 0.4 * strokeWidth, h: 0.20 * strokeWidth, l: r - strokeWidth / 2 }
            const points = [ // 是按照数学坐标系绘制的
                { operator: 'M', x: -cp.w / 2, y: -cp.l },
                { operator: 'L', x: -cp.w / 2, y: -cp.h - cp.l },
                { operator: 'L', x: 0, y: -cp.h - 4 - cp.l }, // 数字是 表针的尖度
                { operator: 'L', x: cp.w / 2, y: -cp.h - cp.l },
                { operator: 'L', x: cp.w / 2, y: -cp.l }
            ]
            // const colorPin = makePolilinePath(rotateMovePoints(points, centerPoint, 6))
            const angles = ref([])
            angles.value = getAngles(data.value)

            const colorPins = ref([])
            colorPins.value = multiplePins(points, centerPoint, angles.value)


            const { startAngle, dynamicAngle } = usePins(node, points, colorPins, centerPoint, angles, 'color-pin')

            return { angles, colorPins, startAngle, dynamicAngle }
        }
    })
</script>

<style lang="scss" scoped>
    path[id^="color-pin"] {
        // stroke: red;
        fill: #D7D7D7;
    }
</style>