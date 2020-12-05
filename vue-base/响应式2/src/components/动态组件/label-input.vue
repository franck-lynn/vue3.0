<template>
    <span>
        <!-- <component :is="tagName" @dblclick="toggle" @blur="backToLabel" :value="isTrue ? value : null"> {{!isTrue? value: null}} </component> -->
        <input type="text" v-if="isTrue" :value="value" @blur="blur" class="label-input">
        <label v-else @dblclick="toggle"> {{value}} </label>
    </span>

</template>

<script>
    import { computed, defineComponent, nextTick, ref, watchEffect } from 'vue'
    export default defineComponent({
        name: 'label-input',
        props: { value: { type: [String, Number], default: '' } },
        setup() {
            //! 遇到的问题: 标签切换时不好刷新获取 input 的焦点事件
            const isTrue = ref(false)
            const tagName = computed(() => isTrue.value ? 'input' : 'span')
            const currParent = ref()
            const toggle = (e) => {
                // 这里的 e.target 是 span
                isTrue.value = true
                // 保存获取当前父节点
                currParent.value = e.target.parentElement
            }
            //!!! 解决异步获取焦点事件, 关键词:
            watchEffect(async () => {
                if (isTrue.value) {
                    await nextTick(
                        () => {
                            // console.log("当前父节点的孩子节点", currParent.value.firstElementChild)
                            // 当前父节点的孩子节点失去焦点
                            currParent.value.firstElementChild.focus()
                        }
                    )
                }
            })
            const blur = () => {
                isTrue.value = false
            }
            // const focus = (e) => {
            //     console.log("获取到了焦点", e.target.value)
            // }
            return { isTrue, tagName, toggle, blur }
        }
    })
</script>

<style lang="scss" scoped>

</style>