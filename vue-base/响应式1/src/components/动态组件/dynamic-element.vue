<template>
    <component :is=elementName></component>
    <button @click="changeElement">切换图标</button>
</template>

<script>
    import { defineComponent, ref, computed } from 'vue'
    export default defineComponent({
        name: 'dynamic-element',
        props: {},
        setup() {
            const isTrue = ref(false)
            // const elementName = ref(isTrue.value ? 'span' : 'i')
            const elementName = computed(() => isTrue.value ? 'span' : 'i')
            
            const changeElement = () =>{
                isTrue.value = !isTrue.value
            }
            return { elementName, changeElement }
        }
    })
</script>

<style lang="scss" scoped>
    span {
        &::before {
            margin: 20px;
            font-family: "iconfont" !important;
            content: "\e698";
            display: block;
            font-size: 48px;
            color: violet;
        }
    }

    i {
        &::before {
            margin: 20px;
            margin: 20px;
            font-family: "iconfont" !important;
            content: "\e854";
            display: block;
            font-size: 48px;
            color: greenyellow;
        }
    }
    button{
        margin: 20px;
        color: red;
        width: 100px;
        height: 40px;
    }
</style>