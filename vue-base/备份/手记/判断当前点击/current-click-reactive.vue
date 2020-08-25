<template>
    <ul v-if="isArr">
        <li v-for="(item, index) in items" :key="index"
          :class="{'当前点击': current.title === item.title}" @click="handleClick">
            <span>{{printStar(deep)}}{{item.title}}</span>
            <current-click-reactive v-if="item.children" :items=item.children :deep=deep+1></current-click-reactive>
        </li>
    </ul>
</template>

<script>
    //? 假设有一组数据, 如何判断是当前点击的元素
    import { defineComponent,  reactive } from 'vue'
    export default defineComponent({
        name: 'current-click-reactive',
        props: { deep: { type: Number, default: 1 }, items: { type: Array, default: () => [] } },
        setup(props) {
            const isArr = Array.isArray(props.items) && props.items.length > 0
            const current = reactive({})
            const printStar = (n) => {
                let star = ''
                for (let i = 0; i < 3 * n; i++){
                    star = star + '*'
                }
                return star
            } 
            const handleClick = (e) => {
                console.log(e.currentTarget)
                let text = e.currentTarget.children[0].innerHTML
                text = text.replace(/\*/g, '')
                // 可以看到, 同级的菜单之前 当前组件是可以切换的, 而不同层级之间就不能切换激活的菜单
                current.title = text
                // 只有当前根节点处于激活状态, 才设置为激活状态
                //! 如果当前 li 节点的上一个节点不是激活状态, 就认为都不是激活状态
                //! 如果上面没有 li 节点, 那这个节点就是 根节点
            }
            return { isArr, printStar, current, handleClick }
        }
    })
</script>

<style lang="scss">

</style>