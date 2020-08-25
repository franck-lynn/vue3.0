<template>
    <!-- 这个是一个子组件, 需求是: 子组件要修改父组件的数据, 父组件是使用这个子组件, test-child-change-parent.vue -->
    <div>
        <h1>父组件的数据-- {{catalogNumber}} </h1>
        <!-- 01. 子组件监听函数 -->
        <input type="text" v-model="description" @change="changeParent">
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'child-change-parent',
        props: {
            catalogNumber: { type: String, default: '' }
        },
        setup(props, ctx) {
            const description = ref('')
            const changeParent = (e) => {
                // 子组件监听函数, 给父组件发射一个监听事件, 名称是 changeParent,
                // 并把输入框中的输入传给父组件
                console.log("通知父组件更改数据", e.target.value)
                ctx.emit('changeParent', e.target.value)
            }
            return { description, changeParent }
        }
    })
</script>

<style lang="scss" scoped>
    div {
        margin-left: 15px;
        color: red;
        font-size: 24px;
    }
</style>