<template>
    <div id="item">jQuery</div>
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'usage-jquery',
        props: {},
        setup() {

            onMounted(() => {
                console.log($('#item'))
            })
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>