<template>
    <div id="app">
        <router-link to="/test-button">按钮</router-link> |
        <router-link to="/test-dialog">对话框</router-link> |
        <router-link to="/test-switch">开关</router-link> |
        <router-link to="/test-radio">radio</router-link> |
        <router-link to="/test-checkbox">复选框</router-link> |
        <router-link to="/test-input">输入框</router-link> |
        <router-link to="/test-form">表单</router-link> |
        <router-link to="/test-progress-bar">进度条</router-link> |
        <!-- 路由出口 -->
        <router-view></router-view>
    </div>
</template>
 
<script>
    
    
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'App',
        components: {
        },
        props: {  }, 
        setup(){
            return {
                
            }
        }
    })
</script>
 
<style lang="scss" scoped>
     @import './scss/shared';
</style>