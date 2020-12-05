<template>
    <svg width="400" height="400">
        <circle :cx="centerPoint.x" :cy="centerPoint.y" r="20"></circle>
        <circle :cx="startPoint.x" :cy="startPoint.y" r="2"></circle>
    </svg>
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
import { isCounterColckwise } from '../svg嵌入vue/utils'
    export default defineComponent({
        name: 'test-is-counter-clockwise',
        props: {},
        setup() {
            const centerPoint = {x: 200, y: 200}
            const startPoint = { x: 200 + 60, y: 200 + 0 }
            onMounted(() => {
                document.querySelector('svg').addEventListener('mousedown', (e) => {
                    isCounterColckwise(centerPoint, startPoint, e)
                })
            })
            return { centerPoint, startPoint }
        }
    })
</script>

<style lang="scss" scoped>
    svg {
        border: 1px solid #eee;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
    }
</style>