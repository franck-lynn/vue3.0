<template>
    <!-- 局部注册组件的传值, 这里用到一个局部注册的组件 -->
    <register-in-local :items=items></register-in-local>
</template>

<script>
    import 'vue/dist/vue.esm-bundler';
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'local-component',
        components: {
            'register-in-local': {
                props: { items: { type: Array, default: () => [] } },
                template: `<div>
                              <h1 v-for="(child, index) in items"> {{child.name}} </h1> 
                          </div>`,

                setup() {
                    return {}
                }
            }
        },
        props: {},

        setup() {
            const items = ref([{ name: "项目1" }, { name: "项目2" }])
            return { items }
        }
    })
</script>

<style lang="scss" scoped>

</style>