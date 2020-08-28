<template>
    <ul :class="[isDeepOne ? 'nav-list' : 'sub-list', {'narrow-to-region': isNarrow}]">

        <li v-for="(item, index) in items" :key="index" :class="[isDeepOne? 'nav-items': 'nav-sub-items', 
              `nav-list__level-${deep}`, {'pulldown-active': isCurrentTarget(currentTarget, item),
              'pulldown-show': toggleShow(currentTarget, item)}]" @click="handleCurrentTarget">

            <component :is="item.children ? 'span': 'a'" :class="item.children ? 
                  'nav-list-title': 'nav-list-link'" :href="item.href">
                <span v-if="item.icon || isDeepOne" :class="['iconfont', item.icon ? item.icon: isDeepOne? 'icon-all-fill': '']"></span>
                <span :class="`nav-list-level-title-${deep}`"> {{item.title}} </span>
            </component>

            <sidebar-items v-if=item.children :items="item.children" :deep=deep+1></sidebar-items>

        </li>

    </ul>
</template>

<script>
    /* 
    这是一个递归组件, 调用了自身
        1. 数据结构
           🚩 一级1  href
           🚩 一级2 >
              二级A
              二级B >
                 三级 B-1  href
                 三级 B-2 href
           ---------- 分割线
           一级3 
              二级C
              二级D
           一级4 href
          const data = [ //
              [
                  { icon: '🚩', title: '一级1', href: 'javascript(void: 0)' },
                  { icon: '🚩', title: '一级2', children: [{ title: '二级A' }, { title: '二级B', children: [{ title: '三级B-1', href: '/#' }, { title: '三级B-2', href: '/#' }] }] },
              ],
                 [{ con: '🚩', title: '一级3', children: [{ title: '二级C' }, { title: '二级D' }] }]
          ]
    */
    import { defineComponent, computed, onMounted, ref, reactive } from 'vue'
    export default defineComponent({
        name: 'sidebar-items',
        props: {
            deep: { type: Number, default: 1 },
            items: { type: Array, default: () => [] },
            isNarrow: { type: Boolean, default: false }
        },
        setup(props, ctx) {
            const isDeepOne = computed(() => props.deep && props.deep === 1)
            // const currentTarget = reactive({})
            const currentTarget = reactive({})
            const isShow = ref(false)

            //* 判断元素是否包含给定的类名
            const hasClassName = (element, className) => element.className.indexOf(className) !== -1
            //* 判断父元素 是否包含子元素.
            const hasChildName = (parent, childName) => {
                // parent 是一个数组, 如果是 HTMLCollection 对象, 可以用
                // es6 的方法 Array.from() 转成一个数组
                return parent.some((element) => hasClassName(element, childName))
            }
            //* 判断是不是当前点击的元素
            const isCurrentTarget = (currentTarget, item) => {
                // 是当前组件, 设置到 localStorge 中去
                // console.log(currentTarget.value)
                return currentTarget ? currentTarget.title === item.title : false
            }
            //* 切换下拉菜单状态
            const toggleShow = (currentTarget, item) => {
                // 只有激活状态下才能改变下拉与否的状态, 别忘了加 .value
                return isCurrentTarget(currentTarget, item) ? isShow.value : ''
            }

            const handleCurrentTarget = (e) => {
                e.stopPropagation() // 阻止事件传播
                e.preventDefault()
                //? 要判断 下面 有 sub-list 的时候才添加 show 类, 没有下拉菜单, 就不需要这个切换类 show
                //? 但是 , active 类还是需要的, 表示当前的点击处于激活状态
                const currentChildrenArray = Array.from(e.currentTarget.children)
                const hasSublist = hasChildName(currentChildrenArray, 'sub-list')
                currentTarget.title = e.currentTarget.querySelector(`span[class^="nav-list-level-title-${props.deep}"]`).innerHTML
                // console.log(currentTarget.title)

                if (!hasSublist) {
                    // 没有 sub-list 类, 也就不需要 show 类, 但是要 active 类
                    isShow.value = false
                } else {
                    isShow.value = !isShow.value
                }
                // 鼠标点击时保存状态
                localStorage.setItem('current_target', currentTarget.title)
                localStorage.setItem('is_show', isShow.value)
                // 发射子组件的点击事件给父组件, 父组件根据这个点击判断是哪个一级数组被激活
                ctx.emit('currentTag', e)
            }
            // watch(currentTarget, (n, o) => {
            //     console.log(`新值是: ${n.title}, 旧值---> ${o.title}`)
            // })
            onMounted(() => {
                document.querySelectorAll('span[class^="nav-list-level-title"]').forEach(item => {
                    // 获取下面的每个子类, 从类名中获取数字, 这个数字代表的是层级
                    // 非贪婪重复的匹配, level 代表获取了代表层级的数字
                    const level = parseInt(item.className.match(/\d+?$/)[0])
                    // 让每个层级的盒子里的元素偏移, 而不是设置盒子的边距, 这样, 盒子的大小始终是全部宽度不变
                    item.style.marginLeft = 10 * level + 'px'
                    // item.previousSibling.style.marginLeft = 10 * level + 'px'
                    // console.log(item.previousSibling.className)
                    if (item.previousSibling.className) {
                        // 上一个兄弟节点, 如果有的话, 并且去掉注释等节点, 或者令其等于 'iconfont'
                        item.previousSibling.style.marginLeft = 10 * level + 'px'
                    }
                })
                // 加载之后从 localStorge 中获取上次退出时保存的 当前打开的组件值
                currentTarget.title = localStorage.getItem('current_target')
                isShow.value = localStorage.getItem('is_show')

            })
            return { isDeepOne, currentTarget, isShow, isCurrentTarget, toggleShow, handleCurrentTarget }
        }
    })
</script>

<style lang="scss" scoped>
    $color-text: #fff;
    $color-level-1: #65CEA7;
    $font-size-level-1: 16px; // 一级菜单的字体大小
    $color-separator-line: #aaa9a9;
    $height-nav-list: 45px; // 图标, 链接, 标题的框高度
    $width-level-1: 165px;
    $width-offset-right-level-1: 45px; // 一级菜单绝对定位时向右偏移的距离
    $width-little-triangle: 5px;
    $offset-left-little-triangle: 10px;
    $color-sub-list: #353f4f;

    $sidebar-min-width: 45px;

    * {
        box-sizing: border-box;
    }

    .nav-list {
        -moz-user-select: none; // 设置不选中文字
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    a {
        text-decoration: none;
    }

    .nav-list {
        //! 一级数组部分开始
        width: 100%; // 数组的第一级, [[{}, {}], [{}, {}]], 表示里面的第级数组
        padding: 0;
        margin: 0;
        color: $color-text;
        text-transform: capitalize; // 首字母大写
        display: flex;
        flex-direction: column;
        list-style-type: none;
        visibility: visible;
        overflow: hidden;
        transition: all .2s ease-in-out;
        font-size: $font-size-level-1;

        &+.nav-list::before {
            content: ''; //* 分割线, 按照数组分割的线, 在第1级的两个数组中间进行分割
            display: block;
            width: 94%;
            border-bottom: 1px solid $color-separator-line;
            align-self: center;
            margin: 6px 0;
        }

        // 开始时菜单都是收缩的, 点击到哪个菜单, 哪个菜单的下级才打开
        //! 一级数组部分结束
        .nav-items {
            .sub-list {
                width: 100%;
                //? 01. 刚开始时 nav-items 下的 sub-list 都是隐藏的
                visibility: visible; // 代替display 实现过渡效果
                overflow: hidden; // 代替display 实现过渡效果
                max-height: 0; // 代替display 实现过渡效果
                // display: none; // 是 nav-item 上的菜单
                transition: all .2s linear; // 代替display 实现过渡效果

                .nav-sub-items {
                    font-size: $font-size-level-1 - 2px !important;

                    &:hover {
                        background-color: rgba(255, 255, 255, .1);
                    }
                }
            }

            //* 有下级菜单的 3列中最后一列靠右显示, > 的箭头符号
            .nav-list-title::after {
                margin-left: auto;
                margin-right: 0.8rem;
                content: ""; // 有下级菜单, 添加右向符号
                height: 6px;
                width: 6px;
                border-left: 2px solid rgba(255, 255, 255, .5);
                border-bottom: 2px solid rgba(255, 255, 255, .5);
                transform: rotate(225deg);
                transition: all .2s;
            }

            //! 数组中的项目标题 悬停时左侧加上绿色显示
            .nav-list-link,
            .nav-list-title {
                display: flex;
                align-items: center;
                height: $height-nav-list; // 图标, 链接, 标题的框高度
                color: $color-text;
                cursor: pointer;
                border-left: 2px solid transparent;
                //! 这里设置一个过渡效果
                transition: all 0.2s ease-in-out;

                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                    color: cyan;
                    border-left: 2px solid cyan;
                }
            }

            &.pulldown-show {

                >.nav-list-title::after {
                    transform: rotate(315deg);
                }

                >.sub-list {
                    // display: block;
                    max-height: 200px; // 代替display 实现过渡效果
                }

                .pulldown-show {
                    >.nav-list-title::after {
                        transform: rotate(315deg);
                    }

                    >.sub-list {
                        max-height: 200px; // 代替display 实现过渡效果
                        // display: block;
                    }
                }
            }

            //? ============================================================
        }

        //? ========================变窄时开始========================
        // 当 nav-list 同级的, 也就是一级菜单 存在 narrow-to-region 时, 也就是左侧边栏变窄了
        // 还要满足 数组处于激活状态.
        &.narrow-to-region {
            .nav-list-level-title-1 {
                display: none;
            }

            .nav-list-title:after {
                display: none;
            }

            .sub-list {
                display: none; // 所有一级菜单后面的子菜单都是隐藏的
            }

            .nav-items {
                &:hover {
                    .nav-list-level-title-1 {
                        position: absolute;
                        background-color: $color-level-1;
                        border-radius: 1px 1px 0 0;
                        display: flex;
                        align-items: center;
                        left: $width-offset-right-level-1;
                        height: $height-nav-list;
                        width: $width-level-1; // 与下级的 .sub-list 宽度相等
                        transition: all 0.2s ease-in-out;
                        margin-left: 0 !important;
                        padding-left: $offset-left-little-triangle;

                        &::before {
                            content: '';
                            width: 0;
                            height: 0;
                            font-size: 0;
                            line-height: 0;
                            border-width: $width-little-triangle;
                            border-style: solid dashed dashed dashed;
                            border-color: transparent $color-level-1 transparent transparent;
                            position: absolute;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            // top: 10px;
                            left: -$offset-left-little-triangle;
                        }
                    }

                    .nav-list-title:after {
                        display: block;
                        position: absolute;
                        left: $width-offset-right-level-1 + $width-level-1 - $font-size-level-1;
                    }

                    >.sub-list {
                        display: block;
                        // visibility: visible;
                        position: absolute;
                        background-color: $color-sub-list;
                        left: $width-offset-right-level-1; // 不能设置高度
                        width: $width-level-1; // 与下级的 .sub-list 宽度相等
                        border-radius: 0 0 1px 1px;

                        .pulldown-show {
                            >.sub-list {
                                display: block;
                            }
                        }
                    }
                }
            }

            //? ========================变窄时结束========================
        }
    }
</style>