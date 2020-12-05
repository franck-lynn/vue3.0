<template>

    <section :class="isMin? 'is-min': 'is-normal'" @click.self="handleCollapse">
        <header class="panel-heading" :class="isDisplay? 'has-body': ''" @click.self="handleClick">
            <span> {{name}} </span>
            <span class="tools pull-right">
                <a href="javascript:;" :class="['iconfont',  isDisplay? 'icon-down1': 'icon-arrowup_bold']" @click.self="handleIsDisplay"></a>
                <a href="javascript:;" class="iconfont icon-minus" @click.self="handleMin"></a>
            </span>
        </header>
        <div class="panel-body" v-if="isDisplay">
            面板内容
        </div>
    </section>

</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'panel',
        props: {
            name: { type: String, default: '' }
        },
        setup() {
            const isDisplay = ref(false)
            const isMin = ref(false)
            
            const handleIsDisplay = () => {
                // 控制内容显示与否
                isDisplay.value = !isDisplay.value
            }
            const handleMin = () => {
                // minus 点击时, 可以保存在 localstorge
                isMin.value = true
                isDisplay.value = false // 最小化时 面板内容不显示
            }
            const handleClick = () => {
                isMin.value = false
                isDisplay.value = !isDisplay.value
            }
            const handleCollapse = () => {
                isMin.value = !isMin.value
                isDisplay.value = !isDisplay.value
            }
            return { isDisplay, isMin, handleIsDisplay, handleMin, handleClick, handleCollapse }
        }
    })
</script>

<style lang="scss" scoped>
    $height: 40px;
    $padding: 12px;
    $radius: 3px;
    $margin: 10px;
    $width-a: 24px;
    $height-a: 24px;

    section {
        margin: $margin;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        border-top-right-radius: $radius;
        border-top-left-radius: $radius;
        border-bottom-left-radius: $radius;
        border-bottom-right-radius: $radius;

        &.is-min {
            height: $margin;
            border-radius: $margin / 2;

            .panel-heading,
            .panel-body {
                display: none;
            }
        }

/* 
        &.is-min {
            * {
                display: none;
            }
 
            width: $height;
            height: $height;
            float: right;
            // right: -95%;
            border-radius: 50%;
            position: relative;
            background: transparent;
            box-shadow: none;
            // display: flex;
            // justify-content: flex-end;
            // box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            &::after {
                font-family: "iconfont" !important;
                content: "\e641";
                font-size: 14px;
                position: absolute;
                width: $width-a;
                height: $height-a;
                top: ($height - $height-a) / 2;
                right: $padding;
                text-align: center;
                line-height: $height-a;
                border-radius: 50%;
                background-color: #E3E4E8;
                color: #858582;
            }

            &:hover::after {
                background-color: #65cea7;
                color: #fff;
            }
        } 
*/

        .panel-heading {
            background-color: #fff;
            border-bottom: none;
            padding: $padding;
            width: 100%;
            height: $height;
            box-sizing: border-box;
            text-transform: uppercase;
            color: #535351;
            font-size: 14px;
            font-weight: bold;
            border-top-right-radius: $radius;
            border-top-left-radius: 3px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom-left-radius: $radius;
            border-bottom-right-radius: $radius;

            &.has-body {
                border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
            }

            .tools {
                a {
                    background-color: #E3E4E8;
                    margin-left: 4px;
                    border-radius: $radius;
                    color: #858582;
                    text-decoration: none;
                    height: $width-a;
                    width: $height-a;

                    &:hover {
                        background-color: #65cea7;
                        color: #fff;
                    }
                }

                .iconfont {
                    display: inline-block;
                    text-align: center;
                    font-size: 12px;
                    line-height: 28px;
                }
            }
        }

        .panel-body {
            box-sizing: border-box;
            width: 100%;
            height: 500px;
            padding: $padding;
            background-color: #fff;
            border-radius: 50px;
            border-bottom-left-radius: $radius;
            border-bottom-right-radius: $radius;
        }
    }
</style>