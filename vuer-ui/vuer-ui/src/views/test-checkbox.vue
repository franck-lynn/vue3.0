<template>
    <div>
        <h3>checkbox 复选框</h3>
        <h4>单个checkbox值---  {{active}} </h4>
        <vuer-checkbox v-model:value="active">是否选中</vuer-checkbox>
        <h4>checkbox组--- {{hobby}} </h4>
        <vuer-checkbox-group v-model:value="hobby">
            <vuer-checkbox label="抽烟"></vuer-checkbox>
            <vuer-checkbox label="喝酒"></vuer-checkbox>
            <vuer-checkbox label="烫头"></vuer-checkbox>
        </vuer-checkbox-group>
        
    </div>
</template>
 
<script>
    
    
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'test-checkbox',
        components: {
        },
        props: {  }, 
        setup(){
            const active = ref()
            const hobby = ref([])
            return {
                active, hobby
            }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>