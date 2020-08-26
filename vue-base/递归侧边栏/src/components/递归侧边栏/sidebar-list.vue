<template>
    <div class="scalable">
        <!-- 左侧边栏的主体内容 -->
        <div class="sidenav">
            <sidebar-items v-for="(item, index) in data" :key="index" :items=item></sidebar-items>
        </div>
        <!-- 分割线 -->
        <div class="separator"><i></i><i></i></div>
    </div>
</template>

<script>
    /*
    ! 展开一个数组的同时, 其他数组关闭的程序
    <div class="sidenav">
        <sidebar-items v-for="(item, index) in data" :key="index" :items=item :class="{'nav-list-active': currentTag === item[0].title}" @currentTag="handleCurrentTag"></sidebar-items>
    </div>
    
    */
    import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
    export default defineComponent({
        name: 'sidebar-list',
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

            //TODO: 1. 分割线不压缩, 已解决
            //TODO: 2. 保存下拉菜单的状态, 部分解决, 例如, 二级菜单, 数组状态不能保存
            //TODO: 3. 左侧边栏下拉菜单缩小到一定值后隐藏文字, 只显示图标, 并且向右侧显示菜单, 并且清除下拉状态,, 并保存目前状态
            const useScalableSidebar = () => {
                // 鼠标点击中间分割线时, 记录鼠标点击时的坐标位置,
                // 当鼠标移动的时候, 通过鼠标新的坐标位置与点击时的坐标位置,
                // 计算出左侧边栏的新宽度.
                // 当鼠标放开后, 就取消鼠标移动的事件监听.
                // 并将新宽度通过 localStorage 存储到浏览器中
                const startX = ref(0) // 鼠标开始点击时的位置
                const startWidth = ref(0) // 记录鼠标按下那一刻 左边 .scalable 的宽度

                const getScalableDivWidth = () => parseInt(window.getComputedStyle(document.querySelector('.scalable')).width, 10)
                // function getScalableDivWidth() {
                // return parseInt(window.getComputedStyle(document.querySelector('.scalable')).width, 10)
                // }

                const onDrag = (e) => {
                    // 在鼠标移动时触发
                    // 新的宽度 = 开始时的侧边宽度 + 鼠标当前位置 - 鼠标在分割线时的位置
                    let newWidth = startWidth.value + e.clientX - startX.value
                    document.querySelector('.scalable').style.width = newWidth + 'px'
                }
                const stopDrag = () => {
                    // 把 数据保存到 localStorge
                    localStorage.setItem('scalable_width', getScalableDivWidth())
                    document.documentElement.removeEventListener('mousemove', onDrag)
                    document.documentElement.removeEventListener('mouseup', stopDrag)
                }
                const startDrag = (e) => {
                    //! 2, 鼠标点击时触发 e.clientX 鼠标的当前位置, 保存到开始点击时的位置变量 startX
                    startX.value = e.clientX
                    // 鼠标点击时的坐标
                    // console.log("鼠标点击时的坐标, 即分割线开始时的位置: ---> ", startX.value)
                    // 获取原来的侧边宽度.
                    // startWidth.value = parseInt(window.getComputedStyle(document.querySelector('.scalable')).width, 10)
                    // 把上面的 startWidth 包装成一个函数, 以便重用
                    startWidth.value = getScalableDivWidth()
                    console.log("分割线左边的div宽度: ---> ", document.querySelector('.scalable').style.width)

                    // console.log("分割线左边的div宽度: ---> ", startWidth.value)
                    //! 3, 鼠标移动时触发
                    document.documentElement.addEventListener('mousemove', onDrag)
                    //! 4, 鼠标松开时触发, 停止监听 mousemove, mouseup
                    document.documentElement.addEventListener('mouseup', stopDrag)
                }

                //! 1, 鼠标按下时触发
                // onMounted(() => separator.value.addEventListener('mousedown', startDrag))
                onMounted(() => {
                    // 加载之后获取侧边栏 .saclable 的宽度
                    startWidth.value = localStorage.getItem('scalable_width') || getScalableDivWidth()
                    document.querySelector('.scalable').style.width = startWidth.value + 'px'
                    // console.log("加载后执行---> ", startWidth.value)
                    document.querySelector('.separator').addEventListener('mousedown', startDrag)
                })

                onUnmounted(() => {
                    window.removeEventListener('mousedown', startDrag)
                    window.removeEventListener('mousemove', onDrag)
                    window.removeEventListener('mouseup', stopDrag)
                })
            }

            useScalableSidebar()
            return { data }
        }
    })
</script>

<style lang="scss" scoped>
    // 定义变量
    $color-fiord: #394263; // sidenav bg & dark text
    $separator-width: 2px;

    .scalable {
        position: relative;
        background-color: #eee;
        min-width: 100px; // 往左边移动时的最小幅度, 再小就不能移动了
        display: flex;
        justify-content: flex-start;
    }

    .sidenav {

        height: 100vh;
        width: 100%;
        background-color: $color-fiord;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    }

    // 分割线
    .separator {
        // position: absolute;
        // top: 0;
        // left: 300px;
        width: $separator-width;
        height: 100%;
        background-color:$color-fiord;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35);
        cursor: col-resize;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        i {
            // 两条小细线
            display: inline-block;
            height: 14px;
            width: 1px;
            background-color: #e9e9e9;
            margin: 0 1px;
        }
    }
</style>