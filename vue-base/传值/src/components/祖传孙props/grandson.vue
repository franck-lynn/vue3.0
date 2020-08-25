<template>
    <!-- 这是一个孙组件 -->
    <h1>孙组件的数据 <span> {{name}} --{{age}} </span></h1>
</template>

<script>
    // 由此可见, 祖组件的数据可以通过 属性一路向下传递的
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'grandson',
        props: {
            name: { type: String, default: '' },
            age: { type: Number, default: 1 }
        },
        setup() {
           
            return {}
        }
    })
</script>

<style lang="scss" scoped>
    h1{
        margin: 20px;
        color: skyblue;
        span {
            color: red;
            font-weight: bold;
            font-size: 24px;
        }
    }
</style>