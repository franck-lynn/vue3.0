<template>
    <usage-nexttick-child :msg="parentMsg" v-if="flag"></usage-nexttick-child>
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'usage-nexttick',
        props: {},
        setup() {
            const parentMsg = ref('')
            const flag = ref(false)
            onMounted(() => {
                // 页面加载完成后赋值给 msg 内容
                parentMsg.value = '父组件通过异步的方式修改属性值'
                flag.value = true
            })
            return { parentMsg, flag }
        }
    })
</script>

<style lang="scss" scoped>

</style>