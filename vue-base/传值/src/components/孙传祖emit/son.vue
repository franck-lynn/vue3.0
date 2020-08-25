<template>
<div>
    <!-- 这个是孙组件, 孙组件要修改祖先组件的 name  -->
    <span> {{name}} </span>
    <button @click="changeName">修改祖先组件数据</button>
</div>
    
</template>
 
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'son',
        props: { 
            name: {type: String, default: ''}
        },
        setup(props, ctx){
            console.log("01, 打印属性的值", props.name)
            const changeName = () => {
                console.log("要修改祖先组件的数据")
                // props.name = "Bob" // 直接修改不了, 报 readonly 错误
                let name = props.name === 'alice' ? '鲍勃': 'alice'
                ctx.emit('changeThisName', name)
                
            }
            return {changeName}
        }
    })
</script>
 
<style lang="scss" scoped>
    span{
        margin: 20px;
    }
</style>