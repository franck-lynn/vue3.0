<template>
    <ul class="progressbar" ref="progress">
        <li v-for="(item, index) in items" :key="index" :class="{'step-active': item.active}"> {{item.name}} </li>
    </ul>

</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'vuer-progress-bar-step',
        props: {},
        setup() {
            const progress = ref(null)
            const items = ref([
                { name: '新建合同', active: true },
                { name: '提交合同', active: true },
                { name: '合同发货', active: false },
                { name: '开票完成', active: true },
                { name: '收款完成', active: false },
            ])
            onMounted(() => {
                // 选择所有的 li 标签
                const width = parseInt(window.getComputedStyle(progress.value).width, 10)
                console.log(width)
                const lies = Array.from(progress.value.children)
                console.log(lies.length)
                lies.forEach(item => {
                    item.style.width = width / lies.length + 'px'
                    console.log(width / lies.length)
                })

            })
            return { items, progress }
        }
    })
</script>

<style lang="scss" scoped>
    $color-progress-active:#2d8d14; // 激活的圆圈的字体
    $color-progress-active-background: #c4c4c4; // 激活的圆圈的背景色
    $color-progress-border: #078f07; // 激活的圆圈的边框
    $circle-dia: 30px;

    .progressbar {
        counter-reset: step;

        li {
            font-size: 0.75rem;
            list-style-type: none;
            float: left;
            // width: 25%; // 每个 li 宽度由 vue 控制
            position: relative;
            text-align: center;

            &.step-active {
                color: $color-progress-active; // 激活的圆圈的字体

                &::before {
                    border-color: $color-progress-border; // 激活的圆圈的边框
                    background-color: $color-progress-active-background; // 激活的圆圈的背景色
                    box-shadow: 0 0 5px #2187e7;
                }

                &+li::after {
                    background-color: green; // 后面连接线的颜色
                    box-shadow: 0 0 5px #2187e7;
                }
            }

            &:first-child::after {
                content: none; // 去掉第一个前面的线
            }

            &::before {
                // 未激活状态, 圆圈的大小等 
                content: counter(step); // 设置递增的步骤
                counter-increment: step;
                width: $circle-dia;
                height: $circle-dia;
                line-height: $circle-dia;
                border: 1px solid #ddd;
                display: block;
                text-align: center;
                margin: 0 auto 5px auto; // 与下面一行文本的距离
                border-radius: 50%;
                background-color: white; // 为了让圆圈盖住连接线
            }

            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 1px;
                background-color: #ddd;
                top: 0.5 * $circle-dia;
                left: -50%;
                z-index: -1;
            }
        }
    }

    * {
        font-family: sans-serif;
        list-style: none;
        padding: 0;
    }
</style>