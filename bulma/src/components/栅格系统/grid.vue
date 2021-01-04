<template>
    <div class="columns">
        <div class="column">
            第1列
        </div>
        <div class="column">
            第2列
        </div>
    </div>
    <a class="button">
        Save changes
    </a>
    <a class="button is-primary is-large">
        Save changes
    </a>
    <button class="button">I'm a button</button>
    <button class="button is-primary">I'm a button</button>
    <div class="card">
        <header class="card-header">
            页眉内容
        </header>

        <div class="card-content">
            <div class="card-image">
                卡片图片
            </div>
        </div>

        <footer class="card-footer">
            页脚内容
        </footer>
    </div>
</template>
 
<script>
    
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'grid',
        props: { 
        },
        setup(){
            
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>