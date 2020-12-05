<template>
    <label-input :value="value1"></label-input>
    <br>
    <label-input :value="value2"></label-input>
</template>
 
<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'use-label-input',
        props: { 
        },
        setup(){
            const value1 = ref(12)
            const value2 = ref('AA')
            return { value1, value2}
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>