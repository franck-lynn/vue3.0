<template>
    <div>
        <p id="box1">lll</p>
    </div>
</template>
 
<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'setting-style',
        props: { 
        },
        setup(){
            onMounted(() => {
                const oDiv1 = document.querySelector('#box1')
                console.log(oDiv1.style)
                oDiv1.style.backgroundColor = 'pink'
                oDiv1.style.color = 'white'
                oDiv1.style.width = 300 + 'px'
                oDiv1.style.height = 300 + 'px'
            })
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>