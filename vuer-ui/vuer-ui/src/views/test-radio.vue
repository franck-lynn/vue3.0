<template>
    <div>
        <h3>radio</h3>
        <h4>选中的值: {{picked}} </h4>
        <vuer-radio label="a" v-model:value="picked">男</vuer-radio>
        <vuer-radio label="b" v-model:value="picked">女</vuer-radio>
        <h3>radio 组</h3>
        <vuer-radio-group v-model:value="picked">
            <vuer-radio label="a"></vuer-radio>
            <vuer-radio label="b"></vuer-radio>
        </vuer-radio-group>
        
        <h3>多个radio 组</h3>
        <h4>complexes的值: {{complexes}} </h4>
        <vuer-radio-group v-model:value="complexes">
            <vuer-radio label="I"></vuer-radio>
            <vuer-radio label="J"></vuer-radio>
            <vuer-radio label="K"></vuer-radio>
        </vuer-radio-group>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-radio',
        components: {},
        props: {},
        setup() {
            const picked = ref()
            const complexes = ref()
            return {
                picked, complexes
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>