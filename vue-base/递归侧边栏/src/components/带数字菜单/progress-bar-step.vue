<template>
    <ul class="progressbar" ref="progress">
        <li v-for="(item, index) in items" :key="index" :class="{'step-active': item.active}"> {{item.name}} </li>
    </ul>

</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'progress-bar-step',
        props: {},
        setup() {
            const progress = ref(null)
            const items = ref([
                { name: '新建合同', active: true },
                { name: '提交合同', active: false },
                { name: '合同发货', active: false },
                { name: '开票完成', active: true },
                // { name: '收款完成', active: false },
            ])
            onMounted(() => {
                // 选择所有的 li 标签
                const width = parseInt(window.getComputedStyle(progress.value).width, 10)
                console.log("01----", width)
                const lies = Array.from(progress.value.children)
                console.log("02----", lies.length)
                lies.forEach(item => {
                    item.style.width = width / lies.length + 'px'
                    console.log("03----", width / lies.length)
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
    $font-size: 0.625rem;

    * {
        font-family: sans-serif;
        list-style: none;
        padding: 0;
    }

    .progressbar {
        counter-reset: step;
        background-color: #fff;
        z-index: 0;

        li {
            font-size: $font-size;
            list-style-type: none;
            float: left;
            // display: flex;
            // width: 25%; // 每个 li 宽度由 vue 控制
            margin: 5px;
            position: relative;
            text-align: center;

            // 所有圆圈之间的连接线
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 1px;
                background-color: #ddd;
                top: 0.5 * $circle-dia;
                left: -50%;
                z-index: -1; // li 后面的细线
            }

            // 所有圆圈的大小等
            &::before {
                content: counter(step); // 设置递增的步骤
                z-index: 3;
                counter-increment: step;
                width: $circle-dia;
                height: $circle-dia;
                line-height: $circle-dia;
                border: 1px solid #ddd;
                display: block;
                text-align: center;
                margin: 0 auto 5px auto; // 与下面一行文本的距离
                border-radius: 50%;
                background-color: #ddd; // 为了让圆圈盖住连接线
            }



            &.step-active {
                // 激活的 li
                color: $color-progress-active; // 激活的圆圈的字体

                &::before {
                    border-color: $color-progress-border; // 激活的圆圈的边框
                    background-color: $color-progress-active-background; // 激活的圆圈的背景色
                    box-shadow: 0 0 8px #2187e7;
                   
                }

                &+li::after {
                    background-color: green; // 后面连接线的颜色
                    box-shadow: 0 0 8px #2187e7;
                    z-index: -1; // li 后面的细线
                }
            }

            &:first-child::after {
                content: none; // 去掉第一个前面的线
            }


        }
    }
</style>