<template>
    <div id="father">
        <p>lll</p>
    </div>
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'crud',
        props: {},
        setup() {
            onMounted(() => {
                // CRUD 操作
                /*
                ! 1. 创建节点 createElement()
                ! 2. 插入节点 appendChild()
                !            insertBefore(newNode, node)
                ! 3. 删除节点 removeChild()
                ! 4. 替换节点 replacehild(newNode, node)
                ! 5. 创建文本节点 createTextNode() 
                */
                const oFather = document.getElementById('father')
                const newNode = document.createElement('p')
                newNode.setAttribute('class', 'active')
                const textNode = document.createTextNode('alex')
                newNode.appendChild(textNode)
                oFather.appendChild(newNode)
            })
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>