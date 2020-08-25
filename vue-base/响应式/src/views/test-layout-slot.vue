<template>
    <h1>插槽</h1>
    <layout-slot>
        <template v-slot:header>
            <h2>header navbar</h2>
        </template>


        <template v-slot:default>
            <p>这里的内容都将进入默认插槽</p>
            <p>不可以写成 v-slot:default</p>
        </template>



        <template v-slot:footer>
            <h2>footer</h2>
        </template>
    </layout-slot>
    <hr>
    <h1>作用域插槽- 父组件使用子组件的数据</h1>
    <!-- 父组件使用子组件插槽 中绑定的属性 -->
    <!-- scoped 的插槽名字和 子组件中绑定的v-bind:scoped 的scoped 名字一致 -->
    <scoped-slot>
        
        <template v-slot:scoped="slotProps">
            {{ slotProps.user.firstName }}
        </template>
    </scoped-slot>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-layout-slot',
        props: {},
        setup() {
            return {}
        }
    })
</script>

<style lang="scss" scoped>
    h1 {
        color: red;
        font-size: 24px;
        margin: 20px;
    }
</style>