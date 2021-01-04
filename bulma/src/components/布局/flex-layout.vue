<template>
    <div class="container">
        <div class="notification">
            This container is <strong>fullwidth</strong> <em>until</em> the <code>$widescreen</code> breakpoint.
        </div>
    </div>
</template>
 
<script>
    
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'flex-layout',
        props: { 
        },
        setup(){
            
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    .container {
        width: 320px;
        height: 100vh;
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>