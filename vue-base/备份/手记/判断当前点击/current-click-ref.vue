<template>
    <ul v-if="isArr">
        <li v-for="(item, index) in items" :key="index"
          :class="{'is-current': current === item.title}" @click="handleClick">
            <span>{{printStar(deep)}}{{item.title}}</span>
            <current-click-ref v-if="item.children" :items=item.children :deep=deep+1></current-click-ref>
        </li>
    </ul>
</template>

<script>
    //? 假设有一组数据, 如何判断是当前点击的元素
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'current-click-ref',
        props: { deep: { type: Number, default: 1 }, items: { type: Array, default: () => [] } },
        setup(props) {
            const isArr = Array.isArray(props.items) && props.items.length > 0
            const current = ref()
            const printStar = (n) => {
                let star = ''
                for (let i = 0; i < 3 * n; i++){
                    star = star + '*'
                }
                return star
            } 
            const handleClick = (e) => {
                // console.log(e.currentTarget.children[0].innerHTML)
                let text = e.currentTarget.children[0].innerHTML
                text = text.replace(/\*/g, '')
                // 可以看到, 同级的菜单之前 当前组件是可以切换的, 而不同层级之间就不能切换激活的菜单
                current.value = text
            }
            return { isArr, printStar, current, handleClick }
        }
    })
</script>

<style lang="scss" scoped>

</style>