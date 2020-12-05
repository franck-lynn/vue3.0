<template>
    <g>
        <defs>
            <!-- 定义环形文字的路径, 如提交, 审核等文件的路径 -->
            <path :id="`text-path-${index}`" :d="arc" v-for="(arc, index) in arcPattern" :key="index"/>
        </defs>
        <defs>
            <!-- 定义环形文字的发光效果, 如提交, 审核等文件的发光效果, 如果没有激活, 文字变暗 -->
            <filter id="glow">
                <feColorMatrix type="matrix" values="0 0 0 0 0
                                                     0 0 0 0.9 0
                                                     0 0 0 0.9 0
                                                     0 0 0 1 0" />
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g>
            <!-- 控制路径的显示与否 -->
            <!-- <use :xlink:href="`#text-path-${index}`" v-for="(item, index) in data" :key="index" /> -->
            <text>
                <textPath :class="['around-text', {active: item.active}]" :xlink:href="`#text-path-${index}`" 
                  v-for="(item, index) in data" :key="index" style="text-anchor: middle;" 
                  startOffset="50%" 
                  :font-size="fontSize"
                  filter="url(#glow)"> {{item.title}}
                </textPath>
            </text>
        </g>
        <g>
            <!-- 每间隔画 2 根细线 ticks, 最外圈的 每间隔 2根细短线 -->
            <path class="ticks" :d="tick" v-for="(tick, index) in ticks" :key="index" />
        </g>

    </g>

    <!-- 百分比部分的路径和文字, 刻度 -->
    <g>
        <defs>
            <!-- 百分比文字的路径 -->
            <path :id="`percents-path-${index}`" :d="arc" v-for="(arc, index) in arcPercentsPattern" :key="index" fill="none" stroke="red" />
        </defs>
        <!-- <use :xlink:href="`#percents-path-${index}`" v-for="(item, index) in arcPercentsPattern" :key="index" /> -->
        <text>
            <!-- 百分比文字 -->
            <textPath :class="['around-text', {active: item.active}]" :xlink:href="`#percents-path-${index}`" 
              v-for="(item, index) in arcPercentsPattern" :key="index" style="text-anchor: middle;" startOffset="50%"> {{index * 10}} </textPath>
        </text>
        <g id="percents">
            <!-- 百分比刻度 ticks -->
            <path class="percents" :d="percent" v-for="(percent, index) in percents" :key="index" />
        </g>
    </g>

</template>

<script>
    import { defineComponent, inject } from 'vue'
    import { useArcPattern, useTicks } from "../utils";
    export default defineComponent({
        name: 'center-circle-text',
        props: {},
        setup() {
            // 父组件注入的数据
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { centerPoint, r, strokeWidth, data } = inject(dashboardSymbol)

            const bottomHeight = 0.5 * strokeWidth
            const topHeight = 0.1 * strokeWidth
            const textArcPathRadius = r - strokeWidth / 2 + bottomHeight
            const fontSize = strokeWidth - bottomHeight - topHeight
            // 起始角和结束角表面已经转到了 12点钟的位置
            const textArcPathStartAngle = -100 * Math.PI / 180
            const textArcPathEndAngle = -80 * Math.PI / 180

            // 实现文本路径和环形文本
            const textPaths = {
                operator: 'A',
                startPoint: {
                    x: textArcPathRadius * Math.cos(textArcPathStartAngle) + centerPoint.x,
                    y: textArcPathRadius * Math.sin(textArcPathStartAngle) + centerPoint.y,
                },
                centerPoint,
                r: textArcPathRadius,
                endPoint: {
                    x: textArcPathRadius * Math.cos(textArcPathEndAngle) + centerPoint.x,
                    y: textArcPathRadius * Math.sin(textArcPathEndAngle) + centerPoint.y,
                }
            }
            // 旋转中心:
            const count = data.value.length
            const pitchAngle = 2 * Math.PI / count
            const arcPattern = useArcPattern(textPaths, centerPoint, count, pitchAngle)

            const ticksParams = {
                r: r + topHeight,
                longLine: 3,
                shortLine: 2,
                countSegments: count, // 共有多少段
                numberPerSegments: 3, // 每段多少个, 从1 开始, 数量为这个数量减去1
                // intervalMark: 5
            }
            const ticks = useTicks(ticksParams, centerPoint)

            // const percentPitchAngle = 2 * Math.PI / perercentsPa
            // 百分比刻度线
            const percentsParams = {
                r: r - strokeWidth / 2,
                longLine: 6,
                shortLine: 4,
                countSegments: 1, // 共有多少段
                numberPerSegments: 100, // 每段多少个
                intervalMark: 5
            }
            // 文字起始角和结束角公用的,
            const percentFontsize = 16
            const percentArcPathRadius = r - strokeWidth / 2 - percentsParams.longLine - percentFontsize
            const percentPaths = {
                operator: 'A',
                startPoint: {
                    x: percentArcPathRadius * Math.cos(textArcPathStartAngle) + centerPoint.x,
                    y: percentArcPathRadius * Math.sin(textArcPathStartAngle) + centerPoint.y,
                },
                centerPoint,
                r: textArcPathRadius,
                endPoint: {
                    x: percentArcPathRadius * Math.cos(textArcPathEndAngle) + centerPoint.x,
                    y: percentArcPathRadius * Math.sin(textArcPathEndAngle) + centerPoint.y,
                }
            }


            const percentsCount = 10
            const percentPitchAngle = 2 * Math.PI / percentsCount
            const arcPercentsPattern = useArcPattern(percentPaths, centerPoint, percentsCount, percentPitchAngle)
            const percents = useTicks(percentsParams, centerPoint)


            return { arcPattern, arcPercentsPattern, fontSize, ticks, percents, data }
        }
    })
</script>

<style lang="scss" scoped>
    .ticks {
        stroke: white;
        stroke-width: 2px;
        stroke-linecap: round;
    }

    .percents {
        stroke: #030404;
        stroke-width: 2px;
        stroke-linecap: round;
    }
    path[id^="text-path"]{
        stroke: none;
        fill: red;
    }
    .active {
        stroke: none;
        fill: cyan;
    }
</style>