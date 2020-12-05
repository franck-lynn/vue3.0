<template>
    <article>
        <p>内容1</p>
    </article>
    <button @click="addElement"> 添加一个节点 </button>

    <hr>
    <ul>
        <li v-for="(item, index) in insertedNodes" :key="index"> {{item.innerHTML}} </li>
    </ul>
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'mutation-observer',
        props: {},
        setup() {
            // 新建一个观察器的实例
            const insertedNodes = ref([])
            const observer = new MutationObserver((mutations) => {
                // console.log("observer是什么? ", observer)
                // mutations.forEach(mutation => console.log("mutation是啥? ", mutation))
                mutations.forEach(mutation => {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        // console.log(mutation.addedNodes[i])
                        // 把变动 新增的子节点 都放进了这个数组
                        insertedNodes.value.push(mutation.addedNodes[i])
                    }
                })
                for (let i = 0; i < insertedNodes.value.length; i++){
                    console.log(insertedNodes.value[i])
                }
            })
            // 
            onMounted(() => {
                const article = document.querySelector('article')
                const options = {
                    'childList': true, // 子节点变动
                    'attribute': true, // 属性变动
                }

                observer.observe(article, options)
            })
            const addElement = () => {
                const oP = document.createElement('p')
                const oPText = document.createTextNode('添加元素的内容')
                oP.appendChild(oPText)
                const article = document.querySelector('article')
                article.appendChild(oP)
            }
            return { addElement, insertedNodes }
        }
    })
</script>

<style lang="scss" scoped>

</style>