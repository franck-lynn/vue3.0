<template>
    <label class="vuer-radio" :class="{'is-checked': label === model}">
        <span class="vuer-radio_input">
            <span class="vuer-radio_inner"></span>
            <input type="radio" class="vuer-radio_original" :value="label" :checked="label === model" v-model="model">
        </span>
        <span class="vuer-radio_label">
            <slot></slot>
            <!-- 如果没有传值，就把label作为文本显示 -->
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    import { defineComponent, inject, computed } from 'vue'
    export default defineComponent({
        name: 'vuer-radio',
        components: {},
        props: {
            value: null,
            ckecked: null,
            label: {type: String, default: ''},
            name: {type: String, default: ''},
        },
        setup(props, ctx) {
            const radioGroupSymbol = Symbol.for('radioGroup')
            const radioGroup = inject(radioGroupSymbol, '')
            // 用于判断radio是否被radioGroup包裹
            const isGroup = () => !!radioGroup
            // 计算属性, 用本组件的 model 控制父组件的 picked
            const model = computed({
                get: () => isGroup()? radioGroup.props.value: props.value,
                set: (value) => {
                    //! 这里需要注意的是 要把 关联到的 value 值 发射给 父组件更改.
                    //! 这里的value属性 是 v-model 默认绑定的子组件(本组件) 上的一个属性. 不是 props 里的 value. 
                    //! 而就是 值 
                    isGroup()?radioGroup.ctx.emit('update:value', value): ctx.emit('update:value', value)
                }
            })
            return {
                model
            }
        }
    })
</script>

<style lang="scss" scoped>
    .#{$prefix}radio {
        color: #606266;
        font-weight: 500;
        line-height: 1;
        position: relative;
        cursor: pointer;
        display: inline-block;
        white-space: nowrap;
        outline: none;
        font-size: 14px;
        margin-right: 30px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;

        .#{$prefix}radio_input {
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            display: inline-block;
            line-height: 1;
            position: relative;
            vertical-align: middle;

            .#{$prefix}radio_inner {
                border: 1px solid #dcdfe6;
                border-radius: 100%;
                width: 14px;
                height: 14px;
                background-color: #fff;
                position: relative;
                cursor: pointer;
                display: inline-block;
                box-sizing: border-box;

                &:after {
                    width: 4px;
                    height: 4px;
                    border-radius: 100%;
                    background-color: #fff;
                    content: "";
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    transition: transform .15s ease-in;
                }
            }

            .#{$prefix}radio_original {
                opacity: 0;
                outline: none;
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0px;
                right: 0;
                bottom: 0;
                margin: 0;
            }
        }

        .#{$prefix}radio_label {
            font-size: 14px;
            padding-left: 10px;
            ;
        }
    }

    // 选中的样式
    .#{$prefix}radio.is-checked {
        .#{$prefix}radio_input {
            .#{$prefix}radio_inner {
                border-color: #409eff;
                background-color: #409eff;

                &:after {
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        }

        .#{$prefix}radio_label {
            color: #409eff;
        }
    }
</style>