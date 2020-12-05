<template>
    <div id="father">
        <p>lll</p>
        <p>rrr</p>
    </div>
</template>

<script>
    // https://www.bilibili.com/video/BV1PJ41157nb?p=14
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'useful-attr',
        props: {},
        setup() {
            onMounted(() => {
                // 获取父节点
                const oFather = document.getElementById('father')
                console.log(oFather.childNodes) // childNodes返回的是节点的子节点集合，包括元素节点、文本节点还有属性节点
                console.log(oFather.children) // children返回的只是节点的元素节点集合
                // 总结：firstChild一派返回全部元素，包括空格以及元素等，而firstElementChild这一派比较高冷，
                // 它看不起文本和注释这点“小钱”，所以如果父元素下的子元素不存在其他element元素，
                // 而是文本元素或注释，它则会报错。
                console.log(oFather.firstChild)
                console.log(oFather.firstElementChild)
                console.log(oFather.parentElement)
                console.log(oFather.nextElementSibling)
                console.log(oFather.previousElementSibling)
                const get_childNodes = (fatherNode) => {
                    const nodes = fatherNode.childNodes
                    const arr = [] // 保存获取的元素节点对象
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i].nodeType === 1) {
                            arr.push(nodes[i])
                        }
                    }
                    return arr
                }
                const childNodes = get_childNodes(oFather)
                console.log(childNodes[0])
            })
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>