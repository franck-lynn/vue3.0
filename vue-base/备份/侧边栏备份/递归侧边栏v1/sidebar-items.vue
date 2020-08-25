<template>
    <ul :class="[isDeepOne ? 'nav-list' : 'sub-list']">

        <li v-for="(item, index) in items" :key="index" :class="[isDeepOne? 'nav-items': 'nav-sub-items', `nav-list__level-${deep}`, 
          {'pulldown-open': currentTarget.title === item.title, 
          'pulldown-show': currentTarget.title === item.title ? isShow: ''}]" @click="handleCurrentTarget">

            <component :is="item.children ? 'span': 'a'" :class="item.children ? 'nav-list-title': 'nav-list-link'" :href="item.href">
                <span v-if="item.icon" :class="['iconfont', item.icon]"></span>
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
    import { defineComponent, computed, onMounted, ref } from 'vue'
    export default defineComponent({
        name: 'sidebar-items',
        props: {
            deep: { type: Number, default: 1 },
            items: { type: Array, default: () => [] }
        },
        setup(props) {
            const isDeepOne = computed(() => props.deep && props.deep === 1)
            const currentTarget = ref({})
            const isShow = ref(false)
            const handleCurrentTarget = (e) => {
                e.stopPropagation() // 阻止事件传播
                currentTarget.value.title = e.currentTarget.querySelector('span[class^="nav-list-level-title"]').innerHTML
                console.log(currentTarget.value.title)
                isShow.value = !isShow.value
            }
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
            })
            return { isDeepOne, currentTarget, isShow, handleCurrentTarget }
        }
    })
</script>

<style lang="scss" scoped>
    /*
        // Sass tils
        $color-fiord: #394263; // sidenav bg & dark text
        $color-white: #FFF; // card bg
        $color-athens-gray: #EAEDF1; // content bg
        $color-catskill-white: #F9FAFC; // top nav bg
        $color-abbey: #777; // gray text
        $color-mischka: #DADAE3; // light gray for menu icon
        $color-java: #1BBAE1; // blue text
        $color-mine-shaft: #333; // main section header bg
        $color-zest: #e67e22; // document icon bg
        $color-jungle-green: #27ae60; // calendar icon bg
        $color-cinnabar: #e74c3c; // main icon bg, red
        $color-amethyst: #af64cc; // main photo icon bg
        $color-transparent: rgba(255, 255, 255, .5);
        $color-alto: #D3D3D3;
        $height-header: 50px;
        $height-footer: 50px;
        $width-sidenav: 240px;
    */
    $color-alto: #d3d3d3;
    $color-fiord: #394263; // sidenav bg & dark text

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
        color: $color-alto;
        text-transform: capitalize; // 首字母大写
        display: flex;
        flex-direction: column;
        list-style-type: none;
        // background-color: darken($color-fiord, 10%);
        visibility: visible;
        overflow: hidden;
        transition: all .4s ease-in-out;
        font-size: 18px;
        // &:last-child { 
        //     background-color: red; // 例如可以设置第一级的哪一个数组, 示例数据data 中的的 一级3所在数组
        // }

        &+.nav-list::before {
            content: ''; //* 分割线, 按照数组分割的线, 在第1级的两个数组中间进行分割
            display: block;
            width: 94%;
            border: 1px solid #aaa9a9;
            align-self: center;
            margin: 6px 0;

        }

        // 开始时菜单都是收缩的, 点击到哪个菜单, 哪个菜单的下级才打开
        //! 一级数组部分结束
        .nav-items {

            //* 有下级菜单的 3列中最后一列靠右显示, > 的箭头符号
            .nav-list-title::after {
                margin-left: auto;
                margin-right: 1rem;
                content: ""; // 有下级菜单, 添加右向符号
                height: 6px;
                width: 6px;
                border-left: 2px solid rgba(255, 255, 255, .5);
                border-bottom: 2px solid rgba(255, 255, 255, .5);
                transform: rotate(225deg);
                transition: all .2s;
            }


            // >.nav-list-title{
            //     transition: all 2s ease-in-out;
            // }


            //! 数组中的项目标题 悬停时左侧加上绿色显示
            .nav-list-link,
            .nav-list-title {
                display: flex;
                align-items: center;
                height: 45px; // 图标, 链接, 标题的框高度
                color: $color-alto;
                cursor: pointer;
                border-left: 2px solid transparent;

                //! 这里设置一个过渡效果
                // transition: all 1s ease-in-out;
                
                
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                    border-left: 2px solid cyan;
                }
            }

            //? 02. 当在 nav-items 下的 nav-list-title 悬停时, 显示直接子元素
            //? ============================================================
            // &:hover {
            // //* 旋转 > 符号
            //     >.nav-list-title::after {
            //         transform: rotate(315deg);
            //     }

            //     &>.sub-list {
            //         display: block;
            //     }
            // }

            // .nav-sub-items:hover {
            //     >.nav-list-title::after {
            //         transform: rotate(315deg);
            //     }

            //     >.sub-list {
            //         display: block; //? 03. 直接的子类显示, 要加 >
            //     }
            // }


            &.pulldown-show {

                >.nav-list-title::after {
                    transform: rotate(315deg);
                }

                >.sub-list {

                    display: block;
                }

                .pulldown-show {

                    >.nav-list-title::after {
                        transform: rotate(315deg);
                    }

                    >.sub-list {

                        display: block;
                    }
                }
            }

            //? ============================================================

            .sub-list {

                width: 100%;
                //? 01. 刚开始时 nav-items 下的 sub-list 都是隐藏的
                display: none; // 是 nav-item 上的菜单

                .nav-sub-items {
                    font-size: 16px !important;

                    &:hover {
                        background-color: rgba(255, 255, 255, .1);
                    }
                }
            }







        }

    }
</style>