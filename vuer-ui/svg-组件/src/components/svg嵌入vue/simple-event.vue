<template>
    <!-- <svg width="200" height="200">
        <circle :cx="cx" :cy="cy" :r="r"></circle>
        <path d="M 100 140 A 40 40 1 1 -100 100" stroke="lime/>
    </svg> -->
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'simple-event',
        props: {},
        setup() {
            const cx = ref(0)
            const cy = ref(0)
            const r = ref(0)
            onMounted(() => {
                // https://www.cnblogs.com/liulei-cherry/p/8435005.html
                // 获取 svg 元素
                const mySvg = document.querySelector('svg')
                // console.log("01, svg 原始的宽高", mySvg.attributes)
                // console.log("02, 获取的是css 中设置的宽高", mySvg.getBoundingClientRect())
                // console.log("03, 获取的是小圆的位置", mySvg.getBBox())
                const {width, height} = mySvg.getBoundingClientRect()
                // 中心点坐标
                const {x, y} = {x: width / 2, y: height / 2}
                
                const offset = 60
                
                cx.value = x
                cy.value = y
                r.value = Math.min(width, height) / 2 - offset
                
            })
            return {cx, cy, r}
        }
    })
</script>

<style lang="scss" scoped>
    *{
        box-sizing: border-box;
    }
    svg {
        border: 1px solid #eee;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);

        circle {
            stroke: rgb(190, 37, 37);
            // fill: rgb(28, 153, 122);
            fill: none
        }
    }
</style>