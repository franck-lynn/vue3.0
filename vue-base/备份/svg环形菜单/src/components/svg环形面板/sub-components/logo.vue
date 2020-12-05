<template>
    <g>
        <defs>
            <path id="logo" :d="logo" stroke="blue" fill="none" />
        </defs>
    </g>
    <g>
        <!-- <use xlink:href="#logo" /> -->
        <text>
            <textPath xlink:href="#logo" style="text-anchor: middle;" startOffset="50%" font-size="6">
                <a href="#"> lry_demry@163.com</a> design by franck.lynn </textPath>
        </text>
    </g>
</template>

<script>
    import { defineComponent, inject } from 'vue'
    // import { makeSinglePath } from "../utils";
    export default defineComponent({
        name: 'logo',
        props: {},
        setup() {
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { centerPoint, r } = inject(dashboardSymbol)
            const R = 0.7 * r
            const logoPathStartAngle = 120 * Math.PI / 180
            const logoPathEndtAngle = 60 * Math.PI / 180
            const pts = {
                operator: 'A',
                startPoint: {
                    x: R * Math.cos(logoPathStartAngle) + centerPoint.x,
                    y: R * Math.sin(logoPathStartAngle) + centerPoint.y,
                },
                centerPoint,
                r: R,
                endPoint: {
                    x: R * Math.cos(logoPathEndtAngle) + centerPoint.x,
                    y: R * Math.sin(logoPathEndtAngle) + centerPoint.y,
                }
            }
            const logo = `M ${pts.startPoint.x} ${pts.startPoint.y} A ${pts.r} ${pts.r}, 0, 0, 0, ${pts.endPoint.x} ${pts.endPoint.y}`
            return { logo }
        }
    })
</script>

<style lang="scss" scoped>

</style>