<template>
    {{info}}
</template>
 
<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'jsonpalceholder-get',
        props: { 
        },
        setup(){
            const info = ref(null)
            onMounted(async () => {
                //! 传统的 url ? 传递参数
                // const response = await fetch('/posts?id=2', {
                //     method: 'get'
                // })
                //! restful 方式传参 params
                const response = await fetch('/posts/12', {
                    method: 'get'
                })
                const posts = await response.json()
                info.value = posts
            })
            return { info }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>