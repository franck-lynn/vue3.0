<template>
    <div class="menu-right">
        <ul class="notification-menu">
            <dropdown-items :titles=data :items=contracts>
            </dropdown-items>
        </ul>

    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'dropdown-menu',
        props: {},
        setup() {
            const data = ref(['合同', '发票', '发货'])
            const contracts = ref([
                { sn: 'HTHZLRY200830-1818', name: '杭州XY机械有限公司' },
                { sn: 'HTHZLRY200830-1820', name: '杭州JJ制造有限公司' },
                { sn: 'HTHZLRY200830-1888', name: "xy" },
            ])
            return { data, contracts }
        }
    })
</script>

<style lang="scss" scoped>
    $width-scrollbar: 6px;

    .notification-menu {
        position: fixed;
        left: 0;
        right: $width-scrollbar; // 距离右边的距离, 和滚动条接触对齐
        // width: 100%;
        height: 45px;
        display: flex;
        justify-content: flex-end;
        // border: 1px solid red;
        background-color: #eee;
        align-items: center;
        // position: relative; // 给子组件用的定位
        // margin-right: 40px;
        // :last-child{
        //     margin-right: 20px;
        // }
        // 加上左侧板栏第1个菜单才能出来
        // .sidebar-ist 的优先级要比这个高
        z-index: 1;
    }
</style>