<template>
    <!-- 节点 -->
    <h2>课程列表</h2>
    <p title="属性节点的名称"> web全栈的课程 </p>
    <ul id="classlist">
        <li class="item">javascript</li>
        <li class="item">css</li>
    </ul>
</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'node',
        props: {},
        setup() {
            onMounted(() => {
                const oLis = document.getElementsByTagName('li') // 节点对象的集合, 类数组, 但不是数组, 不能 push
                for (let i = 0; i < oLis.length; i++) {
                    console.log(oLis[i])
                }
                // document 文档对象
                // 获取元素节点, 三种方法: getElementById, tagName(类数组集合), name(类数组集合) 
                // const elNode = document.getElementById('classlist')
                // console.log(elNode, typeof elNode)
            })
            /*
             1元素节点 
             2文本节点  
             2属性节点
            */
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>