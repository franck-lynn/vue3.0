<template>
    <!-- 在vue局部部注册一个组件 -->
    <local-component></local-component>
</template>

<script>
    import { defineComponent } from 'vue'
    import 'vue/dist/vue.esm-bundler';

    const localComponent = {
        name: 'local-component',
        template: `<h1>这是一个局部注册的组件</h1>`,
        props: {},
        setup() {
            return {}
        }
    }

    export default defineComponent({
        name: 'component-register',
        // components: {
        //     'local-component': {
        //         template: `<h1>这是一个局部注册的组件</h1>`
        //     }
        // },
        components: {
            'local-component': localComponent
        },
        props: {},
        setup() {

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>