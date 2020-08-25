<template>
    <div class="sidenav">
        <sidebar-items v-for="(item, index) in data" :key="index" :items=item></sidebar-items>
    </div>

</template>

<script>
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