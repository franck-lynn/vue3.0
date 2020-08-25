<template>
    <current-click-ref :items=data></current-click-ref>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-current-click-ref',
        props: {},
        setup() {
            const data = ref(
                [
                    { title: "一级A" },
                    {
                        title: "一级B",
                        children: [
                            { title: '二级B-1' },
                            {
                                title: '二级B-2',
                                children: [
                                    { title: '三级B-2-a' },
                                    { title: '三级B-2-b' },
                                ]
                            }
                        ]
                    },
                    { title: '一级C' }
                ]
            )
            return {data}
        }
    })
</script>

<style lang="scss" scoped>

</style>