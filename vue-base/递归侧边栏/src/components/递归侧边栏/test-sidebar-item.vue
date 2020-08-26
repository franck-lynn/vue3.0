<template>
    <div class="sidenav">
        <sidebar-items v-for="(item, index) in data" :key="index" :items=item></sidebar-items>
    </div>

</template>

<script>
    /*
    ! 展开一个数组的同时, 其他数组关闭的程序
    <div class="sidenav">
        <sidebar-items v-for="(item, index) in data" :key="index" :items=item :class="{'nav-list-active': currentTag === item[0].title}" @currentTag="handleCurrentTag"></sidebar-items>
    </div>
    
    */
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'test-sidebar-item',
        props: {},
        setup() {
            const data = [ // 这个数据要做校验, 例如: 最后一级的要增加  href 属性, 不然就是空链接, 不是最后一级的是标题, 不要有链接
                [
                    { icon: 'icon-cogs', title: '一级1', href: 'javascript:void(0)' },
                    { icon: 'icon-cogs', title: '一级2', children: [{ title: '二级A', icon: 'icon-cogs', href: 'javascript:void(0)' }, { title: '二级B', children: [{ title: '三级B-1', href: 'javascript:void(0)' }, { title: '三级B-2', href: 'javascript:void(0)' }] }] },
                ],
                [{ icon: 'icon-cogs', title: 'class one 3', children: [{ title: '二级C', href: 'javascript:void(0)' }, { title: '二级D', href: 'javascript:void(0)' }] }],
                [{ title: 'class one 4', children: [{ title: '二级D', children: [{ title: '三级', children: [{ title: '四级', children: [{ title: '五级' }] }] }] }] }]
            ]
            // const data = [[{ icon: 'icon-cogs', title: '一级1', href: 'javascript:void(0)', children: [{ title: '二级A', href: 'javascript:void(0)' }]}]]
            /*
            // TODO: 要实现一个当前打开的是第一级的哪个数组的判断
            const currentTag = ref([])
            const handleCurrentTag = (e) => {
                // 获取 nav-list 的第一级 title 内容, 如果这个内容 和数组 第1级的 内容有, 就说明点击的是这个内容
                // 不判断整个数组的原因是获取整个数组太麻烦
                const navList = e.currentTarget.parentNode.querySelector('span[class^="nav-list-level-title-1"]').innerHTML
                // console.log(navList)
                currentTag.value =  navList
                // console.log(item)
            }
             // TODO: 要实现一个当前打开的是第一级的哪个数组的判断
             */
            return { data }
        }
    })
</script>

<style lang="scss" scoped>
    $color-fiord: #394263; // sidenav bg & dark text

    .sidenav {

        height: 100vh;
        width: 240px;
        background-color: $color-fiord;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
</style>