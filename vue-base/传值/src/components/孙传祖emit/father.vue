<template>
    <son :name=name></son>
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'father',
        props: { 
            name: {type: String, default: ''}
        },
        setup(){
            
            return {
            }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>