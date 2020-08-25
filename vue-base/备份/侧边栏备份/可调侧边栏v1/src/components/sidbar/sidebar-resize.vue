<template>
    <div class="box-resize-demo">
        <div class="scalable">
            <div class="content">
                <img src="../../scss/images/logo.png" alt="logo">
            </div>

            <!-- 分割线 -->
            <div class="separator"><i></i><i></i></div>
        </div>
        <div class="main">
            <div class="content">右边内容 welcome to codingstartup </div>
            <div><a href="/#/">返回主页</a></div>
        </div>
    </div>

</template>

<script>
    // https://www.bilibili.com/video/BV1L54y197vj?from=search&seid=4585381936670239513
    /**
     * 可调式侧栏
     */
    import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
    export default defineComponent({
        name: 'sidebar-resize',
        props: {},
        setup() {
            // const separator = ref(null)
            // const scalable = ref(null)

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
                //     return parseInt(window.getComputedStyle(document.querySelector('.scalable')).width, 10)
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
                    console.log("加载后执行---> ", startWidth.value)
                    document.querySelector('.separator').addEventListener('mousedown', startDrag)
                })

                onUnmounted(() => {
                    window.removeEventListener('mousedown', startDrag)
                    window.removeEventListener('mousemove', onDrag)
                    window.removeEventListener('mouseup', stopDrag)
                })
            }

            useScalableSidebar()

            return {}
        }
    })
</script>

<style lang="scss" scoped>
    // 定义变量
    $separator-width: 12px;

    .box-resize-demo {
        height: 100vh;
        display: flex;

        -webkit-user-select: none;
        user-select: none;

        .scalable {
            position: relative;
            background-color: #eee;
            min-width: 100px; // 往左边移动时的最小幅度, 再小就不能移动了

            .content {
                padding-right: 34px;

                img {
                    display: block;
                    max-width: 100%;
                    margin: auto;
                }
            }
        }

        .content {
            padding: 20px;
        }

        .main {
            background-color: white;
            flex: 1
        }

        // 分割线
        .separator {
            position: absolute;
            top: 0;
            right: 0;
            width: $separator-width;
            height: 100%;
            background-color: white;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35);
            cursor: col-resize;
            display: flex;
            justify-content: center;
            align-items: center;

            i {
                // 两条小细线
                display: inline-block;
                height: 14px;
                width: 1px;
                background-color: #e9e9e9;
                margin: 0 1px;
            }
        }
    }
</style>