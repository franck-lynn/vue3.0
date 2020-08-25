<template>
    <!-- 实现一个递归组件, 并传值 -->
    <!-- 递归组件定义了一个属性 item, 第1次使用, 绑定的数据是 items  -->
    <!-- 这里的组件注册是有问题的, 因为巧好 有一个组件 recursion 存在内存中掩盖了不能解析组件的错误 -->
    <!-- 递归组件名称改为: recursion-demo 就会出现问题 -->
    <!-- 改为 单文件注册的型式 -->
    <recursion-demo :item=items> </recursion-demo>
</template>

<script>
    import { defineComponent, ref, computed } from 'vue'
    import 'vue/dist/vue.esm-bundler';
    export default defineComponent({
        name: 'recursion-component',
        //! recursion-component.vue 只是调用这个组件, test-recursion-component 组件还是调用 recursion-component.vue
        //! 这是实现递归的组件, 递归组件定义 开始 
        components: {
            'recursion-demo':  {
                props: { item: { type: Array, default: () => [] } },
                template: `<ul v-if="isArr"> 
                               <li v-for="(child, index) in item" :key="index">
                                    <!-- 递归的出口, 当没有 children 属性时走这里 -->
                                    <h1> {{child.name}} </h1>
                                    <!-- 当有 children 数据时, 调用自身的组件, 进行递归 -->
                                    <recursion-demo v-if="child.children" :item="child.children"> </recursion-demo>
                               </li>
                           </ul>`,
                setup(props) {
                    const isArr = computed(() => {
                        console.log("打印一下 props.item", props.item)
                        return Array.isArray(props.item) && props.item.length > 0
                    })

                    return { isArr }
                }
            }
        },
        //! 递归组件定义结束

        props: {},
        setup() {
            const items = ref([
                { name: "项目1" },
                {
                    name: "项目2",
                    children: [
                        { name: '子项目a' },
                        { name: '子项目b' },
                    ]
                }
            ])
            return { items }
        }
    })
</script>

<style lang="scss" scoped>

</style>