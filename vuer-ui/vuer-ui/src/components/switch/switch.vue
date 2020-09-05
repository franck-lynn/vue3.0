<template>
    <label for="name" class="vuer-switch" :class="{'is-checked':value}" @click="handleClick">
        <span class="vuer-switch_core" ref="core">
            <span class="vuer-switch_button"></span>
        </span>
        <input type="checkbox" class="vuer-switch_input" :name="name" ref="input">
    </label>
</template>

<script>
    import { defineComponent, ref,  nextTick, } from 'vue'
    export default defineComponent({
        name: 'vuer-switch',
        components: {},
        props: {
            value: { type: Boolean, default: false },
            name: { type: String, default: '' },
            activeColor: { type: String, default: '' },
            inactiveColor: { type: String, default: '' },
        },
        setup(props, ctx) {
            //! props 中的 value 值解构出来 会失去响应
            const { activeColor, inactiveColor } = props
            // 控制颜色, 要操作DOM
            const core = ref(null)
            const input = ref(null)
             
            // 设置颜色的函数
            const setColor = () => {
               console.log("打印一下core 元素", core.value)
                if (activeColor || inactiveColor) {
                    let color = props.value ? activeColor : inactiveColor
                    core.value.style.borderColor = color
                    core.value.style.backgroundColor = color
                }
                input.value.checked = props.value
            }

            // 加载好后再执行
            // onMounted(
            //     setColor
            // )
            const handleClick = async () => {
                ctx.emit('update:value', !props.value)
                await nextTick()
                setColor()
            }
            return {
                handleClick,
                core,
                input
            }
        }
    })
</script>

<style lang="scss" scoped>
    .#{$prefix}switch {
        display: inline-block;
        align-items: center;
        position: relative;
        font-size: 14px;
        line-height: 20px;
        vertical-align: middle;

        .#{$prefix}switch_core {
            margin: 0;
            display: inline-block;
            position: relative;
            width: 40px;
            height: 20px;
            border: 1px solid #dcdfe6;
            outline: none;
            border-radius: 10px;
            box-sizing: border-box;
            background: #dcdfe6;
            cursor: pointer;
            transition: border-color .3s, background-color .3s;
            vertical-align: middle;

            .#{$prefix}switch_button {
                position: absolute;
                top: 1px;
                left: 1px;
                border-radius: 100%;
                transition: all .3s;
                width: 16px;
                height: 16px;
                background-color: #fff;
            }
        }
    }

    // 选中样式
    .is-checked {
        .#{$prefix}switch_core {
            border-color: #409eff;
            background-color: #409eff;

            .#{$prefix}switch_button {
                transform: translateX(20px);
            }
        }
    }

    // 隐藏input标签
    .#{$prefix}switch_input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
    }
</style>