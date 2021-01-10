<template>
    {{username}}
    <br>
    <input type="text" v-model="username" />
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'vue3.0-model',
        props: {},
        setup() {
            const username = ref()
            return {username}
        }
    })
</script>

<style lang="scss" scoped>

</style>