<template>
    <!-- 监视子元素的变动 -->
    <article>
        <p>内容1</p>
    </article>
    <button @click="addElement"> 添加一个节点 </button>

    
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'observe-child',
        props: {},
        setup() {
            const addElement = () => {
                const oP = document.createElement('p')
                const oPText = document.createTextNode('添加元素的内容')
                oP.appendChild(oPText)
                const article = document.querySelector('article')
                article.appendChild(oP)
            }
            const callback = records => {
                records.map(record => {
                    console.log("变动元素的类型: " + record.type)
                    console.log("变动元素的目标: " + record.target.innerHTML)
                })
            }
            const mo = new MutationObserver(callback)
            // 监视的内容
            const options = {
                childList: true,
                subtrue: true,
            }
            onMounted(() => {
                const element = document.querySelector('article')
                // 监视器调用监视的方法
                mo.observe(element, options)
            })
            return { addElement }
        }
    })
</script>

<style lang="scss" scoped>

</style>