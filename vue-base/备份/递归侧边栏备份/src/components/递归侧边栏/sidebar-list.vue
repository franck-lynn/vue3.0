<template>
    <div class="scalable">
        <!-- 左侧边栏的主体内容 -->
        <div :class="['sidenav', {'narrow': isNarrow}]">
            <sidebar-items v-for="(item, index) in data" 
              :key="index" :items=item 
              :isNarrow=isNarrow :class="{'nav-list-active': currentTag === item[0].title}" 
              @currentTag="handleCurrentTag">
            </sidebar-items>
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
            const isNarrow = ref(false)
            const currentTag = ref('')
            const breakPoint = 80 // 设置左侧边栏宽窄断点
            const handleCurrentTag = (e) => {
                // 接收子组件发射过来的事件,  判断的依据是这样的, 每次点击事件的发射过来的时候, 根据点击
                // 的节点找到它的父节点, 会一直找到根部, 根据节点的第一个数据就是一级数组的第1个, 
                // 与 item[0].title 是对应的, 这样就实现了判断激活的数组
                // console.log(e.currentTarget.parentNode.querySelector('.nav-list-level-title-1').innerHTML)
                currentTag.value = e.currentTarget.parentNode.querySelector('.nav-list-level-title-1').innerHTML
            }


            const data = [ // 这个数据要做校验, 例如: 最后一级的要增加  href 属性, 不然就是空链接, 不是最后一级的是标题, 不要有链接
                [
                    { icon: 'icon-cogs', title: '一级1', href: 'javascript:void(0)' },
                    {
                        icon: 'icon-cogs',
                        title: '一级菜单',
                        children: [
                            { title: '二级A', icon: 'icon-cogs', href: 'javascript:void(0)' },
                            {
                                title: '二级B',
                                children: [{ title: '三级B-1', href: 'javascript:void(0)' },
                                    { title: '三级B-2', href: 'javascript:void(0)' }
                                ]
                            }
                        ]
                    },
                ],
                [{ icon: 'icon-cogs', title: 'class one 3', children: [{ title: '二级C', href: 'javascript:void(0)' }, { title: '二级D', href: 'javascript:void(0)' }] }],
                [{
                    title: 'class one 4',
                    children: [{
                        title: '二级D',
                        children: [{
                            title: '三级',
                            children: [{
                                title: '四级',
                                children: [
                                    { title: '五级' }
                                ]
                            }]
                        }]
                    }]
                }],
            ]
            // const data = [[{ icon: 'icon-cogs', title: '一级1', href: 'javascript:void(0)', children: [{ title: '二级A', href: 'javascript:void(0)' }]}]]

            //TODO: 1. 开发版侧边栏基本完成, 下一步需要进一步进行优化以及进行封包操作
            const useScalableSidebar = () => {
                // 鼠标点击中间分割线时, 记录鼠标点击时的坐标位置,
                // 当鼠标移动的时候, 通过鼠标新的坐标位置与点击时的坐标位置,
                // 计算出左侧边栏的新宽度.
                // 当鼠标放开后, 就取消鼠标移动的事件监听.
                // 并将新宽度通过 localStorage 存储到浏览器中
                const startX = ref(0) // 鼠标开始点击时的位置
                const startWidth = ref(0) // 记录鼠标按下那一刻 左边 .scalable 的宽度
                const minScalableWidth = 45 // 设置左侧边栏最小的宽度, 和css中设置保持一致
                // 监视 startWidth的值, 还要告诉子组件这个值变了, 子组件收到更改后再在自己的DOM中加一个类
                // 这样子组件自己也能根据这个变化了, 改为在移动时实时触发
                // watch(startWidth, (newWidth) => {
                //     // console.log(`新的宽度是---> ${newWidth}, 旧的宽度是---> ${oldWidth}`)
                //     isNarrow.value = newWidth < 200 ? true : false
                // })

                const getScalableDivWidth = () => parseInt(window.getComputedStyle(document.querySelector('.scalable')).width, 10)
                // function getScalableDivWidth() {
                // return parseInt(window.getComputedStyle(document.querySelector('.scalable')).width, 10)
                // }

                const onDrag = (e) => {
                    // 在鼠标移动时触发
                    // 新的宽度 = 开始时的侧边宽度 + 鼠标当前位置 - 鼠标在分割线时的位置
                    let newWidth = startWidth.value + e.clientX - startX.value
                    newWidth = newWidth < minScalableWidth ? minScalableWidth : newWidth // 设置最小的拖到宽度

                    // isNarrow 改为在移动时实时触发, 停止移动时把数据保存到 localStorge, 初始化时从 localStorge 中获取 isNarrow
                    isNarrow.value = newWidth < breakPoint ? true : false

                    document.querySelector('.scalable').style.width = newWidth + 'px'
                }
                const stopDrag = () => {
                    // 把 数据保存到 localStorge
                    localStorage.setItem('scalable_width', getScalableDivWidth())
                    localStorage.setItem('is_narrow', isNarrow.value)

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
                    // console.log("分割线左边的div宽度: ---value> ", document.querySelector('.scalable').style.width)

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
                    // 初始化时从 localStorge 中获取 isNarrow
                    isNarrow.value = JSON.parse(localStorage.getItem('is_narrow')) || false
                    // 获取初始的宽度值
                    // console.log("获取初始的宽度值属性 ", isNarrow.value, localStorage.getItem('is_narrow') , Boolean(localStorage.getItem('is_narrow')))
                    document.querySelector('.scalable').style.width = startWidth.value + 'px'
                    // console.log("加载后执行---> ", startWidth.value)
                    document.querySelector('.separator').addEventListener('mousedown', startDrag)
                    // 加载后让 vue 观察 屏幕的尺寸, 如果小于一定的值, 就认为是移动端, 则需要增加对应的类

                    // 监听 resize 事件, 实现响应式的布局
                    window.onresize = function() {
                        const screenWidth = document.body.clientWidth
                        if (screenWidth < 768) {
                            // 当处于窄屏状态时, 设置了 narrow类
                            document.querySelector('.scalable').style.width = minScalableWidth + 'px'
                            isNarrow.value = true
                        } else {
                            // 宽屏时, 取消 narrow类, 这个时候, 如果这个时候左侧边栏如果小于断点, 仍然会
                            // 按照大屏的显示, 这是不合理的, 应该是如果左侧小于端点, 还是按照小屏显示
                            document.querySelector('.scalable').style.width = localStorage.getItem('scalable_width') + 'px'
                            isNarrow.value = getScalableDivWidth() < breakPoint ? true : false
                            // isNarrow.value = false

                        }
                    }
                })

                onUnmounted(() => {
                    window.removeEventListener('mousedown', startDrag)
                    window.removeEventListener('mousemove', onDrag)
                    window.removeEventListener('mouseup', stopDrag)
                })
            }

            useScalableSidebar()
            return { isNarrow, currentTag, handleCurrentTag, data }
        }
    })
</script>

<style lang="scss" scoped>
    // 定义变量
    $color-sidebar-bg: #353f4f; // 侧边栏背景色
    $separator-width: 4px;
    $sidebar-min-width: 45px;


    .scalable {
        position: relative;
        // position: fixed;
        // height: 100%;
        min-width: $sidebar-min-width; // 往左边移动时的最小幅度, 再小就不能移动了
        display: flex;
        // 这里可以仿照 app-layout.vue 里修改滚动调的颜色, 宽度等
        // overflow-y: scroll;
        justify-content: flex-start;
        z-index: 2;
    }

    .sidenav {

        height: 100%;
        width: 100%;
        background-color: $color-sidebar-bg;
        // box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    }

    // 分割线
    .separator {
        // position: absolute;
        // top: 0;
        // left: 300px;
        width: $separator-width;
        height: 100%;
        background-color: $color-sidebar-bg;
        // box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35);
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

    @media screen and (max-width: 768px) and (min-width: 320px) {
        // .scalable {
        //     width: $sidebar-min-width !important;
        // }
    }
</style>