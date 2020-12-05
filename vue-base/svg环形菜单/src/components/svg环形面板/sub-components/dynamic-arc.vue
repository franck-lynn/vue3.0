<template>
    <g>
        <circle id="slide-circle" cx="200" cy="200" :r="arcRadius" fill="none"  stroke-width="2"></circle>
        <!-- <path :d="dynamicArc" fill="" /> -->
        <path :id="`static-arc-${index}`" :class="{'is-pending': isPending[index]}" :d="item" 
          v-for="(item, index) in angles" :key="index" fill="none" stroke="red" stroke-width="2" />
        <path id="dynamic-arc" :d="dynamicArc" fill="none" stroke="green" stroke-width="2" />
    </g>
</template>

<script>
    import { defineComponent, inject, ref, watch } from 'vue'
    import { createArcs, createArcByAngleAndCenter } from "../utils";
    export default defineComponent({
        name: 'dynamic-arc',
        props: {
            dynamicAngle: { type: Number, default: () => { /*  */ } },
            startAngle: {type: Number, default: () => { /* */ }}
        },
        setup(props) {
            // 父组件注入的数据
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { centerPoint, r, strokeWidth, data } = inject(dashboardSymbol)
            // around-arcs 圆弧半径
            const arcRadius = r - 0.18 * strokeWidth //
            const { isPending, angles } = createArcs(centerPoint, arcRadius, data.value)
            
            const dynamicArc = ref('')
            // console.log("父组件传过来的angles", props)
            watch(props, (n) => {
                // console.log("新的值", n.dynamicAngle)
                // console.log("起始角", props.startAngle)
                dynamicArc.value = createArcByAngleAndCenter(centerPoint, arcRadius, props.startAngle, n.dynamicAngle)
            })
            // watchEffect(() => {
            //     console.log("父组件传过来的angles", props)
            // })
            return { arcRadius, isPending, angles, dynamicArc }
        }
    })
</script>

<style lang="scss" scoped>
#slide-circle{
    stroke: #1F0101;
}
path[id^="static-arc"]{
    stroke: #00FF00;
    &.is-pending{
        stroke: rgb(52, 52, 58);
    }
}
#dynamic-arc{
    stroke: #00FF00;
}
</style>