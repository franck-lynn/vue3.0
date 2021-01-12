<template>
    <div id="aaa">
        
    </div>
</template>
 
<script>
    import octicons from "@primer/octicons"
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'vue-svg-octicons',
        props: { 
        },
        setup(){
            onMounted(() => {
                 const x = octicons.x.toSVG()
                 const aaa = document.querySelector('#aaa')
                 aaa.innerHTML = x
            })
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    .octicon{
        width: 100px;
        height: 100px;
        color: red;
    }
</style>