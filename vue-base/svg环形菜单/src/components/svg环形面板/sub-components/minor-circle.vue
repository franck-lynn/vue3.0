<template>
    <defs>
        <filter id="drop-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
            <feOffset in="blur" dx="0" dy="1" result="offsetBlur" />
            <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>

    <defs>
        <filter id="grad">
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#05a" stop-opacity="0.5" />
                <stop offset="100%" stop-color="#0a5" stop-opacity="1.0" />
            </linearGradient>
        </filter>
    </defs>
    <g id="minor-up-left">
        <!-- 上下梭子形的这部分图形 -->
        <!-- <circle id="up-outter" :cx="uoc.centerPoint.x" :cy="uoc.centerPoint.y" :r="uoc.r"></circle> -->
       
        <circle id="up-inner" :cx="uic.centerPoint.x" :cy="uic.centerPoint.y" 
          :r="uic.r" >
           <title>提示的信息提示的信息提示的信息提示的信息提示的信息</title>
        </circle>
        <circle :cx="label1Circle.x" :cy="label1Circle.y" r="4"></circle>
        <circle :cx="label2Circle.x" :cy="label2Circle.y" r="4"></circle>
        <circle :cx="middleLittle.x" :cy="middleLittle.y" r="3"></circle>
        <!-- fill-rule="nonzero" fill="#032034"  -->
        <path class="minor-circle" :d="upLeft" />
        <path class="minor-circle" :d="upRight" />
        <path class="minor-circle" :d="down" filter="url(#drop-shadow)" />
        <!-- 竖线 -->
        <path class="v-lines" :d="line" v-for="(line, index) in leftLines" :key="index" fill="" />
        <path class="v-lines" :d="line" v-for="(line, index) in rightLines" :key="index" fill="" />
        <g>
            <text id="text-up-middle" :x="textUpMiddle.x" :y="textUpMiddle.y" style="text-anchor: middle; dominant-baseline: middle;"> M </text>
            <text id="text-up-left" :x="textUpLeft.x" :y="textUpLeft.y" style="text-anchor: middle; dominant-baseline: alphabetic;"> + </text>
            <text id="text-up-right" :x="textUpRight.x" :y="textUpRight.y" style="text-anchor: middle; dominant-baseline: alphabetic;"> - </text>
            <text id="label3" :x="label3.x" :y="label3.y" style="font-size: 12px;">Rudder</text>
            <text id="led-font3" :x="LEDFont3.x" :y="LEDFont3.y" style="font-size: 16px;">123</text>
        </g>

        <g>
            <defs>
                <!--标签文字  -->
                <path id="help" :d="help" />
                <path id="label1" :d="label1" />
                <path id="label1" :d="label1" />
                <path id="label2" :d="label2" />
                <path id="led1" :d="led1" />
                <path id="led2" :d="led2" />
            </defs>
            <!-- <use xlink:href="#help" /> -->
            <text>
                <textPath id="help-text" xlink:href="#help" style="text-anchor: middle;" startOffset="50%"> Help </textPath>
                <textPath xlink:href="#label1" style="text-anchor: middle;" startOffset="40%"> 标签1 </textPath>
                <textPath xlink:href="#label2" style="text-anchor: middle;" startOffset="50%"> 标签2 </textPath>
                <textPath class="led-font" xlink:href="#led1" style="text-anchor: start;" startOffset="10%"> 12.3% </textPath>
                <textPath class="led-font" xlink:href="#led2" style="text-anchor: end;" startOffset="90%"> 456 </textPath>
            </text>
        </g>
    </g>
</template>

<script>
    import { defineComponent, inject } from 'vue'
    import { fail, xSymmetricMovePoints, makePolilinePath, createLine } from '../utils'
    export default defineComponent({
        name: 'minor-circle',
        props: { iccR: { type: Number, default: () => ({}) } },
        setup(props) {
            const dashboardSymbol = Symbol.for('dashboardSymbol')
            const { centerPoint } = inject(dashboardSymbol)

            // 内部中心圆的半径 iccR 由父组件 inside-center-Circle.vue 传进来
            const iccR = props.iccR
            // 内部中心圆图形的参数, gp = graohics params
            const gp = {
                iicAR: 0.95 * iccR, // 内部中心圆的劣弧圆弧半径, 上下各占一部分
                uocR: 0.38 * iccR, // uoc = up outter circle // 上部 外部 的圆, 写字母 M 的大圆
                // 与 uocR 相差 0.05 iccR = iccR -iicAR, 间距相等
                uicR: 0.32 * iccR, // uic = up inside circle // 上部 内部 的圆, 写字母 M 的小圆, 
                uh: 0.35 * iccR, // 越小线越靠近中心
                cr: 0.08 * iccR, // chamfer raidus 倒圆半径
                dh: 0.6 * iccR
            }
            // 内部中心圆里的内容, 尺寸相对于内部中心圆的半径 
            const uoc = {
                r: gp.uocR,
                centerPoint: { x: centerPoint.x, y: centerPoint.y - iccR + gp.uocR }
            }
            const uic = {
                r: gp.uicR,
                centerPoint: { x: centerPoint.x, y: centerPoint.y - iccR + gp.uocR }
            }

            const uld = () => {
                // 以数学坐标系建立方程, 再将坐标点进行关于 x 轴翻转 平移到 中心点 操作
                // 数学坐标系中, 水平直线的方程是 y = h,  
                // 圆 uoc 中心点坐标为(0, y0) 方程为 x^2 + (y - y0)^2 = R^2
                const y0 = iccR - gp.uocR
                if (gp.uh < iccR - 2 * gp.uocR || gp.uh > iccR) {
                    fail('直线不能与圆相交')
                }
                // A 点
                const x1 = -Math.sqrt(Math.pow(gp.uocR, 2) - Math.pow(gp.uh - y0, 2))
                if (gp.uh + gp.cr > gp.iicAR - gp.cr) {
                    fail('倒圆半径过大')
                }
                // B点
                const cosA = (gp.uh + gp.cr) / (gp.iicAR - gp.cr)
                const alpha = Math.acos(cosA)
                const x2 = -(gp.iicAR - gp.cr) * Math.sin(alpha)
                // D点
                const y4 = (Math.pow(gp.iicAR, 2) - Math.pow(gp.uocR, 2) + Math.pow(y0, 2)) / (2 * y0)
                const x4 = -Math.sqrt(Math.pow(gp.iicAR, 2) - Math.pow(y4, 2))

                const points = [ // 上左 梭子形, 点的坐标
                    { operator: 'M', x: x1, y: gp.uh }, // A点
                    { operator: 'L', x: x2, y: gp.uh }, // B点
                    {
                        operator: 'A',
                        startPoint: { x: x2, y: gp.uh },
                        r: gp.cr,
                        centerPoint: { x: x2, y: gp.uh + gp.cr },
                        endPoint: {
                            x: -gp.iicAR * Math.sin(alpha),
                            y: gp.iicAR * Math.cos(alpha)
                        } // C点
                    },
                    {
                        operator: 'A',
                        startPoint: {
                            x: -gp.iicAR * Math.sin(alpha),
                            y: gp.iicAR * Math.cos(alpha)
                        },
                        r: gp.iicAR,
                        centerPoint: { x: 0, y: 0 },
                        endPoint: { x: x4, y: y4 } // D点
                    },
                    {
                        operator: 'A',
                        // startPoint: {x: x3, y: y3},
                        startPoint: { x: x1, y: gp.uh },
                        r: gp.uocR,
                        centerPoint: { x: 0, y: 0 },
                        // endPoint: {x: x1, y: gp.uh},
                        endPoint: { x: x4, y: y4 },
                    }
                ]
                return xSymmetricMovePoints(points, centerPoint.x, centerPoint.y)
                // return points
            }

            const urd = () => {
                // 以数学坐标系建立方程, 再将坐标点进行关于 x 轴翻转 平移到 中心点 操作
                // 数学坐标系中, 水平直线的方程是 y = h,
                // 圆 uoc 中心点坐标为(0, y0) 方程为 x^2 + (y - y0)^2 = R^2
                const y0 = iccR - gp.uocR
                if (gp.uh < iccR - 2 * gp.uocR || gp.uh > iccR) {
                    fail('直线不能与圆相交')
                }
                // A 点, 从右往左, 圆弧 用顺时针, 顺序与左边的一样
                const x1 = Math.sqrt(Math.pow(gp.uocR, 2) - Math.pow(gp.uh - y0, 2))
                // B点
                if (gp.uh + gp.cr > gp.iicAR - gp.cr) {
                    fail('倒圆半径过大')
                }
                const cosA = (gp.uh + gp.cr) / (gp.iicAR - gp.cr)
                const alpha = Math.acos(cosA)
                const x2 = (gp.iicAR - gp.cr) * Math.sin(alpha)
                // C点
                const y4 = (Math.pow(gp.iicAR, 2) - Math.pow(gp.uocR, 2) + Math.pow(y0, 2)) / (2 * y0)
                const x4 = Math.sqrt(Math.pow(gp.iicAR, 2) - Math.pow(y4, 2))

                const points = [ // 上右 梭子形, 点的坐标
                    { operator: 'M', x: x2, y: gp.uh }, // B点
                    { operator: 'L', x: x1, y: gp.uh }, // A点
                    {
                        operator: 'A',
                        startPoint: { x: x4, y: y4 }, // 
                        r: gp.uocR,
                        centerPoint: { x: 0, y: 0 },
                        endPoint: { x: x1, y: gp.uh },
                    },
                    {
                        operator: 'A',
                        endPoint: {
                            x: gp.iicAR * Math.sin(alpha),
                            y: gp.iicAR * Math.cos(alpha)
                        },
                        r: gp.iicAR,
                        centerPoint: { x: 0, y: 0 },
                        startPoint: { x: x4, y: y4 } // D点
                    },
                    {
                        operator: 'A',
                        startPoint: {
                            x: gp.iicAR * Math.sin(alpha),
                            y: gp.iicAR * Math.cos(alpha)
                        }, // C点
                        r: gp.cr,
                        centerPoint: { x: x2, y: gp.uh + gp.cr },
                        endPoint: { x: x2, y: gp.uh },
                    },


                ]
                return xSymmetricMovePoints(points, centerPoint.x, centerPoint.y)
            }
            // const upLeft = makePolilinePath(xSymmetricMovePoints(uld(), centerPoint.x, centerPoint.y))
            const upLeft = makePolilinePath(uld())
            // const upRight = makePolilinePath(ySymmetricMovePoints(uld(), centerPoint.x, centerPoint.y))
            const upRight = makePolilinePath(urd())

            const dd = () => { // 下梭子形
                const cosA = (gp.dh + gp.cr) / (gp.iicAR - gp.cr)
                const alpha = Math.acos(cosA)
                const x1 = (gp.iicAR - gp.cr) * Math.sin(alpha)
                const points = [
                    { operator: 'M', x: -x1, y: -gp.dh },
                    { operator: 'L', x: x1, y: -gp.dh },
                    {
                        operator: 'A',
                        startPoint: {
                            x: x1,
                            y: -gp.dh
                        },
                        r: gp.cr,
                        centerPoint: { x: -x1, y: -gp.dh - gp.cr },
                        endPoint: {
                            x: gp.iicAR * Math.sin(alpha),
                            y: -gp.iicAR * Math.cos(alpha)
                        }
                    },
                    {
                        operator: 'A',
                        startPoint: {
                            x: gp.iicAR * Math.sin(alpha),
                            y: -gp.iicAR * Math.cos(alpha)
                        },
                        r: gp.iicAR,
                        centerPoint: { x: 0, y: 0 },
                        endPoint: {
                            x: -gp.iicAR * Math.sin(alpha),
                            y: -gp.iicAR * Math.cos(alpha)
                        },
                    },
                    {
                        operator: 'A',
                        endPoint: {
                            x: -x1,
                            y: -gp.dh
                        },
                        r: gp.cr,
                        centerPoint: { x: -x1, y: -gp.dh - gp.cr },
                        startPoint: {
                            x: -gp.iicAR * Math.sin(alpha),
                            y: -gp.iicAR * Math.cos(alpha)
                        }
                    },

                ]
                return xSymmetricMovePoints(points, centerPoint.x, centerPoint.y)
            }
            const down = makePolilinePath(dd())
            //! 定义写字的位置
            // 1, 上小半圆 中心圆 字写在圆心位置
            const textUpMiddle = { x: centerPoint.x, y: centerPoint.y - iccR + gp.uocR }

            // 2. 左右2个 加减号
            const textUpLeft = { x: centerPoint.x - 1.4 * gp.uocR, y: centerPoint.y - gp.uh - 1.6 * gp.cr }
            const textUpRight = { x: centerPoint.x + 1.4 * gp.uocR, y: centerPoint.y - gp.uh - 1.6 * gp.cr }

            //! 两个标签前的小圆点
            const labelX1 = 0.8 * gp.iicAR
            const labelX2 = 1.2 * gp.cr
            const labelY = centerPoint.y - 0.6 * gp.uh
            const babelfontHeight = 12
            const label1Circle = { x: centerPoint.x - labelX1, y: labelY }
            const label2Circle = { x: centerPoint.x + labelX2, y: labelY }
            const label1 = createLine({
                startPoint: { x: centerPoint.x - labelX1, y: labelY + babelfontHeight / 2 },
                endPoint: { x: centerPoint.x + labelX2, y: labelY + babelfontHeight / 2 }
            })
            const label2 = createLine({
                startPoint: { x: centerPoint.x + labelX2, y: labelY + babelfontHeight / 2 },
                endPoint: { x: centerPoint.x + labelX1, y: labelY + babelfontHeight / 2 },

            })
            const ledH = 0.4 * gp.dh
            const led1 = createLine({ startPoint: { x: centerPoint.x - 1.2 * labelX1, y: centerPoint.y + ledH }, endPoint: { x: centerPoint.x, y: centerPoint.y + ledH } })
            const led2 = createLine({ startPoint: { x: centerPoint.x, y: centerPoint.y + ledH }, endPoint: { x: centerPoint.x + 1.2 * labelX1, y: centerPoint.y + ledH } })

            const label3 = { x: centerPoint.x - 0.6 * labelX1, y: centerPoint.y + 0.9 * gp.dh }
            const LEDFont3 = { x: centerPoint.x + 0.2 * labelX1, y: centerPoint.y + 0.9 * gp.dh }

            const middleLittleCenter = centerPoint.y + 0.55 * gp.dh
            const middleLittle = { x: centerPoint.x, y: middleLittleCenter }
            // help
            const helpPoints = () => {
                const y = centerPoint.y + gp.dh + 0.618 * (gp.iicAR - gp.dh)
                const c = 0.8
                const points = {
                    startPoint: { x: centerPoint.x - c * gp.uocR, y },
                    endPoint: { x: centerPoint.x + c * gp.uocR, y }
                }
                return points
            }
            const nunberLines = 20, // 有多少条小竖线, 
                distance = 4, // 间距多少
                hLine = 10

            const leftLines = (() => {
                const arr = []
                for (let i = 0; i < nunberLines; i++) {
                    const pts = {
                        startPoint: {
                            x: centerPoint.x - distance - (i + 1) * distance,
                            y: middleLittleCenter - hLine / 2
                        },
                        endPoint: {
                            x: centerPoint.x - distance - (i + 1) * distance,
                            y: middleLittleCenter + hLine / 2
                        }
                    }

                    arr.push(createLine(pts))
                }
                return arr
            })()
            const rightLines = (() => {
                const arr = []
                for (let i = 0; i < nunberLines; i++) {
                    const pts = {
                        startPoint: {
                            x: centerPoint.x + distance + (i + 1) * distance,
                            y: middleLittleCenter - hLine / 2
                        },
                        endPoint: {
                            x: centerPoint.x + distance + (i + 1) * distance,
                            y: middleLittleCenter + hLine / 2
                        }
                    }

                    arr.push(createLine(pts))
                }
                return arr
            })()


            const help = createLine(helpPoints())


            return {
                uoc,
                uic,
                upLeft,
                upRight,
                down,
                textUpMiddle,
                textUpLeft,
                textUpRight,
                help,
                label1Circle,
                label2Circle,
                label1,
                label2,
                led1,
                led2,
                label3,
                LEDFont3,
                middleLittle,
                leftLines,
                rightLines
            }
        }
    })
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: "ds-digit";
        src: url("../ds_digital/ds-digit.ttf") format("opentype");
    }

    #up-inner {
        stroke: none;
        fill: #1E394B;
    }

    #text-up-middle {
        stroke: none;

        fill: #FFFFFF;
        font-size: 24px;
    }

    .minor-circle {
        stroke: none;
        fill-rule: evenodd;
        fill: #1E394B;
    }

    .led-font {
        font-family: "ds-digit";
        font-size: 36px;
        fill: red;
    }

    #led-font3 {
        font-family: "ds-digit";
        fill: red;
    }

    .v-lines {
        stroke: #032034;
    }

    #help-text {
        stroke: none;
        fill: #ffffff;
    }

    #text-up-left,
    #text-up-right {
        stroke: none;
        fill: #ffffff;
        font-size: 32px;
    }
</style>