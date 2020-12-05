<template>
    <!-- 使用 nexttick -->
    <div ref="box">
        {{msg}}
    </div>
</template>

<script>
    import { defineComponent /* , nextTick */ } from 'vue'
    export default defineComponent({
        name: 'usage-nexttick-child',
        props: { msg: { type: String, default: '' } },
        setup(props) {
            // console.log("01, 这里获取不到父组件传过来的属性值: ", props.msg)
            // nextTick(() => {
            //     console.log("02, 在nextTick 中获取到了: ", props.msg)
            // })
            // nextTick().then(_ => console.log("03, 这里也可以执行", props.msg));
            console.log("04, 父组件设置开关: ", props.msg)
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>