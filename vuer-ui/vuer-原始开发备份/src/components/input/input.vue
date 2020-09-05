<template>
    <div class="vuer-input" :class="{'vuer-input_suffix':showSuffix}">
        <input class="vuer-input_inner" :class="{'is-disabled': disabled}" :placeholder="placeholder" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :name="name" :value="value" @input="handleInput" :disabled=disabled>
        <span class="vuer-input_suffix">
            <i class="iconfont icon-cancel" v-if="clearable && value" @click="clear"></i>
            <i :class="`iconfont icon-password-${[passwordVisible ? 'visible': 'not-view']}`" v-if="showPassword && type=='password'" @click="handlePassword"></i>
        </span>
    </div>
</template>

<script>
    import { defineComponent, computed, ref } from 'vue'
    export default defineComponent({
        name: 'vuer-input',
        components: {},
        props: {
            placeholder: { type: String, defalult: '' },
            type: { type: String, default: 'text' },
            name: { type: String, default: '' },
            disabled: { type: Boolean, default: false },
            // 一般输入框 双绑的是 字符串类型
            value: { type: String, default: '' },
            clearable: { type: Boolean, default: false },
            showPassword: { type: Boolean, default: false },
        },
        setup(props, ctx) {
            const { clearable, showPassword } = props
            const handleInput = (e) => {
                ctx.emit('update:value', e.target.value)
            }
            const clear = () => {
                // 把内容清空, 通知 父组件, 让父组件把内容清空
                ctx.emit("update:value", '')
            }
            // 控制 小图标的显示, 密码 和 一次性清空的小图标
            const showSuffix = computed(() => (clearable || showPassword))
            // 显示密码, 用 passwordVisible 控制是否显示密码对话框
            let passwordVisible = ref(false)
            const handlePassword = () => {
                console.log("密码是否显示?", passwordVisible.value)
                // 要修改父组件的 type, 但是要改自己的来控制父组件
                passwordVisible.value = !passwordVisible.value
                console.log("修改后的passwordVisible=", passwordVisible.value)
            }
            return {
                handleInput,
                showSuffix,
                clear,
                passwordVisible,
                handlePassword
            }
        }
    })
</script>

<style lang="scss" scoped>
    @at-root {
        #{$prefix}input {
            width: 100%;
        }
    };
    .#{$prefix}input {
        /* 降低 width 权重, 以便外面可以覆盖这个值 */
        /* width: 100%; */
        position: relative;
        font-size: 14px;
        display: inline-block;

        .#{$prefix}input_inner {
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645, 045, .355, 1);
            width: 100%;

            &:focus {
                outline: none;
                border-color: #409eff;
            }

            // input禁用样式
            &.is-disabled {
                background-color: #f5f7fa;
                border-color: #e4e7ed;
                color: #c0c4cc;
                cursor: not-allowed;
            }
        }
    }

    // 后面加suffix的意思是后面如果有后缀的话，触发该样式
    .#{$prefix}input_suffix {
        .#{$prefix}input_inner {
            padding-right: 30px;
        }

        .#{$prefix}input_suffix {
            position: absolute;
            right: 10px;
            height: 100%;
            top: 0;
            line-height: 40px;
            text-align: center;
            color: #c0c4cc;
            transition: all .3s;
            z-index: 900;

            i {
                color: #c0c4cc;
                font-size: 14px;
                cursor: pointer;
                transition: color .2s cubic-bezier(.645, .045, .355, 1);
            }
        }
    }
</style>