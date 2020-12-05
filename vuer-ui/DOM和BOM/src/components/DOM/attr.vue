<template>
    <h2>课程列表</h2>
    <p title="属性节点的名称"> web全栈的课程 <!--注释-->  </p>
    <ul id="classlist">
        <li class="item">javascript</li>
        <li class="item">css</li>
    </ul>
</template>
 
<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'attr',
        props: { 
        },
        setup(){
            onMounted(() => {
                // https://www.bilibili.com/video/BV1PJ41157nb?p=14
                // 获取 元素
                const oP = document.getElementsByTagName('p')[0]
                // const title = oP.getAttribute('title')
                // console.log(title)
                oP.setAttribute('id', 'box')
                
                console.log("元素节点: " +  oP.nodeName +"| "+oP.nodeValue+"|"+oP.nodeType)
                console.log("属性节点: " + oP.attributes[0].nodeName +"| "+oP.attributes[0].nodeValue+"|"+oP.attributes[0].nodeType)
                console.log("文本节点: " + oP.childNodes[0].nodeName +"| "+oP.childNodes[0].nodeValue+"|"+oP.childNodes[0].nodeType)
                console.log("注释节点: " + oP.childNodes[1].nodeName +"| "+oP.childNodes[1].nodeValue+"|"+oP.childNodes[1].nodeType)
                console.log("文档节点: " + document.nodeType)
                
            })
            return {  }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>