<template>
    <div>
        <h3>开关</h3>
        <h4>开关值: {{active}} </h4>

        <vuer-switch v-model:value="active"></vuer-switch>
        <h4>带颜色的开关 </h4>
        <vuer-switch v-model:value="active" active-color="green" inactive-color="red"></vuer-switch>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-switch',
        components: {},
        props: {},
        setup() {
            const active =  ref(false)
            // watch(active, (n, o) => {
            //     console.log(`观察 value 值变化, 新 ${n}, 旧 ${o} `)
            // })
            return {
                active
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>