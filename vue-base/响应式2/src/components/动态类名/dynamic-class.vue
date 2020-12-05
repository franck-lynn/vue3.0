<template>
    <h1 :class="hasClass(data)"> 动态类名 </h1>
    <button @click="handleClick"> 测验动态类名 </button>
</template>

<script>
    import { defineComponent, reactive } from 'vue'
    export default defineComponent({
        name: 'dynamic-class',
        props: {},
        setup() {
            const data = reactive({ m: 1, n: 0 })

            const hasClass = (data) => {
                if (data.m > data.n) {
                    return 'green'
                } else {
                    return 'red'
                }

            }
            const handleClick = () => {
                const temp = data.m
                data.m = data.n
                data.n = temp
            }

            return { data, hasClass, handleClick }
        }
    })
</script>

<style lang="scss" scoped>
    .green {
        background-color: green;
    }

    .red {
        background-color: red;
    }
</style>