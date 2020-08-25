<template>
    <div class="wrapper">
        <div class="sidebar" style={color:red}>
        </div>

        <div class="container">
            <nav class="navbar"></nav>
            <main class="main"> </main>

            <footer></footer>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
    export default defineComponent({
        name: 'column-two',
        props: {},
        setup() {
            const useResizeSidebar = () => {
                const startX = ref(0)
                const startWidth = ref(0)

                const stopDrag = () => {
                    document.documentElement.removeEventListener('mousemove', onDrag)
                    document.documentElement.removeEventListener('mouseup', stopDrag)
                }
                const onDrag = (e) => {
                    //! 5. 设置拖动的宽度
                    // 获取鼠标的当前位置, 再减去保存在开始的位置 加上左侧边栏的宽度, 就是新的侧边宽度
                    let newWidth = e.clientX - startX.value + startWidth.value
                    // alert(newWidth)
                    // 设置新的侧边栏宽度
                    document.querySelector('.sidebar').style.width = newWidth + 'px'

                }
                const startDrag = (e) => {
                    //! 2.  开始拖动之前要知道 当前的鼠标位置
                    startX.value = e.clientX
                    //! 3.  获取左侧边栏的宽度
                    startWidth.value = parseInt(window.getComputedStyle(document.querySelector('.sidebar')).width, 10)

                    //! 4. 监听 鼠标移动 事件 mousemove, 开始拖动
                    document.documentElement.addEventListener('mousemove', onDrag)

                    //! 6. 监听鼠标松开事件 mouseup, 停止事件, 移除 mousemove, mouseup 事件
                    document.documentElement.addEventListener('mouseup', stopDrag)
                }
                //! 1. 鼠标点击左侧边栏时触发 mousedown 事件, 开始拖动
                onMounted(() => {
                    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentElement
                    // document.documentElement返回文档的 文档元素, 返回 html 元素
                    document.documentElement.addEventListener('mousedown', startDrag)
                })
                onUnmounted(() => {
                    window.removeEventListener('mousedown', startDrag)
                    window.removeEventListener('mousemove', onDrag)
                    window.removeEventListener('mouseup', stopDrag)
                })
            }
            useResizeSidebar()


            // const useMousePosition = () => {
            //     const x = ref(0)
            //     const y = ref(0)
            //     const update = e => {
            //         x.value = e.pageX
            //         y.value = e.pageY
            //     }
            //     onMounted(() => window.addEventListener('mousemove', update))
            //     onUnmounted(() => window.removeEventListener('mousemove', update))
            //     return { x, y }
            // }
            // const { x, y } = useMousePosition()
            return {}
        }
    })
</script>

<style lang="scss" scoped>
    /* 
    两列, 可拖拽, 右侧, 响应式.
    三行, 中间自适应, 页脚
    采用弹性布局
    */
    $sidebar-width: 160px;

    .wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-flow: row; //内容按列排序

        .sidebar {
            width: 200px;
            background-color: rgb(243, 235, 235);
        }

        .container {
            flex: 1; //这里设置为占比1，填充满剩余空间
            background-color: rgb(11, 152, 199);
        }
    }
</style>