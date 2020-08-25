<template>
    <ul>
        <!-- 获取当前点击的组件 -->
        <!-- <li v-for="(item , index) in items" :key="index" :class="{active: isActive}">{{item.name}} </li> -->
        <li v-for="(item , index) in items" :key="index" 
            :class="{active: currentTarget.name === item.name}" 
            @click="getCurrentTarget">{{item.name}} </li>
    </ul>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'current-target',
        props: {},
        setup() {
            
            const items = ref([
                { name: '项目A' }, { name: '项目B' }, { name: '项目C' }, { name: '项目D' }
            ])
            
            const currentTarget = ref({ name: '项目A' })
            const getCurrentTarget = (e) => {
                console.log("当前点击的标签内容->>>", e.currentTarget.innerHTML)
                currentTarget.value.name = e.currentTarget.innerHTML
            }
            // const useCurrentTarget = () => {
            //     const isActive = ref(false)
            //     // const update = (e) => {
            //     //     console.log(e.target)
            //     // }
            //     onMounted(() => {
            //         // 只能获取到第1个组件
            //         // document.querySelector('li').addEventListener('click', update)
            //         document.querySelector('li').addEventListener('click', function (e){
            //             console.log(e)
                        
            //         })
            //     })
            //     return isActive
            // }
            // const isActive = useCurrentTarget()


            return { items, currentTarget, getCurrentTarget }
        }

    })
</script>

<style lang="scss" scoped>
.active{
    color: red
}
</style>