<template>
    <svg width="400" height="400">
        <central-circle v-if="flag"></central-circle>
        <triangle-pin v-if="flag"> </triangle-pin>
        <center-circle-text v-if="flag"></center-circle-text>
        <inner-Circle v-if="flag"></inner-Circle>
        <color-pins v-if="flag"></color-pins>

        <!-- 作为color-pins 的子组件 -->
        <!-- <dynamic-arc v-if="flag"></dynamic-arc> -->
        <logo v-if="flag"></logo>
    </svg>
</template>

<script>
    import { defineComponent, onMounted, provide, ref } from 'vue'
    export default defineComponent({
        name: 'circle-dashboard',
        props: {},
        setup() {
            const data = ref([
                { id: 0, title: '发货', active: true },
                { id: 1, title: '提交', active: true },
                { id: 2, title: '审核', active: true },
                { id: 3, title: '订货', active: false },
                { id: 4, title: '校对', active: true },
                { id: 5, title: '付款', active: true },
                { id: 6, title: '开票', active: false },
                { id: 7, title: '收款', active: false },
            ])
            const flag = ref(false)
            const useDashboard = () => {
                const node = ref()

                const gap = 5 // 与 svg 边框的距离
                const strokeWidth = 40

                onMounted(() => {
                    node.value = document.querySelector('svg')
                    const { width, height } = node.value.getBoundingClientRect()
                    const centerPoint = { x: width / 2, y: height / 2 }
                    flag.value = true
                    // 中心圆半径 r, 两边各占 strokeWidth / 2 线宽
                    const r = Math.min(width / 2, height / 2) - gap - strokeWidth / 2
                    const dashboardSymbol = Symbol.for('dashboardSymbol')
                    provide(dashboardSymbol, { node, centerPoint, r, strokeWidth, data })
                })
            }
            useDashboard()
            return { flag }
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