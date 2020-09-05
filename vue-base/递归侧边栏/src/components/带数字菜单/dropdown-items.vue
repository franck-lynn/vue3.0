<template>
    <!-- <li v-for="(title, index) in titles" :key="index" 
      :class="{'dropdown-menu-active': currentTag === title }" @click="currentTag = title"> -->
    <li v-for="(title, index) in titles" :key="index" :class="{'dropdown-menu__active': currentTag === title}">
        <!-- 按钮图标点击时显示下来菜单, 动态添加 dropdown-toggle 类 -->
        <!-- <button :class="['icon-button', 'info-number', {'dropdown-menu__active': isActive, 'dropdown-toggle': isShow}]" @click="dropdown"> -->
        <button :class="['icon-button', 'info-number', {'dropdown-menu__active': isActive, 'dropdown-toggle': isShow}]" @click="dropdown">
            <span class="iconfont icon-xiangmu1"></span>
            <span class="badge">8</span>
        </button>
        <!-- 当有dropdown-toggle 类时显示下面的下来菜单  -->
        <!-- <div :class="{'dropdown-menu': isShow}"> -->
        <div :class="['dropdown-list', {'dropdown-list__active': isActive,'dropdown-list__show': isShow}]">
            <h5 class="title"> {{title}} </h5>
            <ul class="dropdown-list user-list">

                <li class="new" v-for="(item, index) in items" :key="index">
                    <a href="javascript:void(0)" class="dropdown-toggle info-number" data-toggle="dropdown">
                        <!-- 通过 data-tip 产生提示的代码, 没有实现鼠标跟随, 暂时不用, 用浏览器默认的方式 -->
                        <!-- <div class="task-info" :data-tip="item.sn + '-' +item.name"> -->
                        <!-- TODO: 如果长度不够长或者有部分内容没有, 就不设置title属性 -->
                        <div class="task-info" :title="hasTooltip(item)">
                            <div> {{item.sn}} - {{item.name}} </div>
                        </div>
                    </a>
                    <div class="progress progress-striped">
                        <progress-bar-step></progress-bar-step>
                    </div>
                </li>
                <li class="new"><a href="">查看全部</a></li>
            </ul>
        </div>
    </li>
    <profile :currentTag=currentTag @changeCurrentTag="changeCurrentTag"></profile>
</template>

<script>
    // 合同状态: 新建合同 提交 发货 开票 收款 退货 换货 退票 开票 
    // 实现查看和滚动显示
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'dropdown-items',
        props: { titles: { type: Array, default: () => [] }, items: { type: Array, default: () => [] } },
        setup() {
            const name = ref('新合同')
            const currentTag = ref('')
            const hasTooltip = (item) => {
                // 没有 item 时, 或者 没有 item.name 或者 item.sn 就返回空字符串
                if (!item || !item.name || !item.sn) return ''
                if (item.sn && item.name) {
                    const tooltip = item.sn + item.name
                    return tooltip.length < 22 ? '' : item.sn + item.name
                }
            }
            const data = ref(
                [
                    { id: 1, state: 'new', href: '/#', taskInfo: 'task-info', taskName: '新建合同', done: .44 },
                    { id: 1, state: 'new', href: '/#', taskInfo: 'task-info', taskName: '新建合同', done: .44 },
                    { id: 1, state: 'new', href: '/#', taskInfo: 'task-info', taskName: '新建合同', done: .44 },
                ]
            )
            const isActive = ref(false)
            const isShow = ref(false)
            // TODO: 优化为一个点击事件
            const changeCurrentTag = (e) => {
                currentTag.value = e
                console.log("子组件发射过来的数据", e)

            }
            const dropdown = (e) => {
                // 获取点击元素的下一个兄弟节点, 判断这个节点的数据 是否和 当前节点一致, 依此判断是不是当前节点
                console.log("子组件被点击了", e.currentTarget.parentNode.querySelector('.title').innerHTML)
                currentTag.value = e.currentTarget.parentNode.querySelector('.title').innerHTML
                isActive.value = true
                isShow.value = !isShow.value
            }

            return { currentTag, isShow, hasTooltip, isActive, dropdown, changeCurrentTag, name, data }
        }
    })
</script>

<style lang="scss" scoped>
    $icon-font-size: 25px; // 水平导航条图标的宽高字体尺寸
    $height-icon-btn: 45px; // 水平导航条高度
    $width-dropdown-menu: 300px; // 下来菜单的宽度
    $offset-right-icon-btn: 0px; // icon-btn 距离右侧宽度
    $color-dropdown-menu-color: #65cea7;

    a {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }


    li {
        position: relative;

        // =======按钮图标部分开始=======
        .icon-button {
            position: relative;
            width: $height-icon-btn;
            height: $height-icon-btn;
            border: none;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-right: $offset-right-icon-btn;

            &:hover {
                background-color: #424f63;
                color: $color-dropdown-menu-color;
            }

            .iconfont {
                font-size: $icon-font-size;
            }

            .badge {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.8 * $icon-font-size;
                height: 0.8 * $icon-font-size;
                border-radius: 50%;
                color: #fff;
                background-color: #FF6C60;
                font-size: 12px;
                left: 50%;
                top: 20%;
            }
        }

        // =======按钮图标部分结束=======

        // 仅当 li 激活时才显示
        // 现在显示未激活时的状态
        .dropdown-list {
            display: none;
            position: absolute;
            background-color: #fff; // 不加底色是透明的
            top: $height-icon-btn; // 下来菜单紧贴水平导航条.
            right: $offset-right-icon-btn; // 与 icon-btn 右对齐
            width: $width-dropdown-menu;

            &::before {
                $little-triangle-width: 6px;
                content: ''; // 向上的小三角符号
                width: 0;
                height: 0;
                font-size: 0;
                line-height: 0;
                border-width: $little-triangle-width;
                border-style: dashed dashed solid dashed;
                border-color: transparent transparent $color-dropdown-menu-color transparent;
                position: absolute;
                top: - 2 * $little-triangle-width;
                right: $height-icon-btn / 2 - $little-triangle-width;
            }

            .title {
                display: flex;
                align-items: center;
                height: 45px;
                font-size: 0.725rem;
                color: #fff;
                background-color: $color-dropdown-menu-color;
                padding-left: 10px;
            }

            .dropdown-list {

                // border: 1px solid #ddd;
                border: {
                    width: 0 1px 1px 1px;
                    style: solid;
                    color: #ddd;
                }

                display: flex;
                flex-direction: column;

                >li {
                    // background: #ddd;

                    display: flex;
                    flex-direction: column;
                    width: 100%;

                    &+li {
                        border-top: 1px solid #eee; // 分割线
                    }

                    .info-number {

                        font-size: 16px; //信息栏
                        padding: 10px;

                        .task-info {
                            >* {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }

                        &:hover {
                            color: $color-dropdown-menu-color;

                            //! 搜索关键词: 悬停提示,  css实现了hover显示title的效果
                            //! 哪个元素上设置了 title 属性, 就在哪个类上加 ::after 伪类, 实现悬停的提示
                            // https://blog.csdn.net/qq_41499782/article/details/106827037
                            // https://www.cnblogs.com/horanly/p/6101283.html
                        }
                    }

                    .progress {
                        height: 80px;
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        // background-color: greenyellow;
                    }

                    &:last-child {
                        display: flex;
                        font-size: 14px;
                        justify-content: center;
                        padding-left: 10px;
                        height: 40px;
                    }
                }
            }
        }

        // 激活时的状态
        &.dropdown-menu__active {
            .icon-button {
                // 激活状态时再加上背景色, 与悬停状态可以同时存在
                background-color: #424f63;
                color: $color-dropdown-menu-color;

            }

            .dropdown-list {
                &__show {
                    display: block;
                }

            }

        }
    }

    @media screen and (max-width: 768px) and (min-width: 320px) {
        li {
            &:nth-child(1), &:nth-child(2) {
                .dropdown-list__active {
                    left: - 0.4 * $width-dropdown-menu;
                    &::before{
                        right: $width-dropdown-menu / 2 ;
                    }
                }
            }


        }
    }

    /*
    // 使用data-tip来实现title的效果
    // 通过属性选择器获取到标签，加上相对定位
    [data-tip] {
        position: relative;
        // display: inline-block;
    }

    // 统一设置伪类的样式
    [data-tip]::before,
    [data-tip]::after {
        position: absolute;
        visibility: visible;
        opacity: 0;
        z-index: 20200618;
        pointer-events: none;
        transition: .2s;
    }

    // 单独设置before， 设置小三角形
    [data-tip]::before {
        content: '';
        // 通过border来设置三角形
        border: 5px solid transparent;
        // 通过这个来设置三角形的直角的方向
        border-top-color: rgba(0, 0, 0, .6);
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        bottom: 100%;
        left: 50%;
        margin-bottom: -5px;
    }

    // 设置字体和背景
    [data-tip]::after {
        // 通过 attr来或者字体
        content: attr(data-tip);
        background: rgba(0, 0, 0, .7);
        font: 12px Microsoft YaHei;
        color: #fff;
        padding: 4px 8px;
        border-radius: 2px;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, .3);
        bottom: 100%;
        width: 100%;
        white-space: pre-wrap;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
    }

    // hover的时候显示
    [data-tip]:hover::before,
    [data-tip]:hover::after {
        visibility: visible;
        opacity: 1;
        -webkit-transition-delay: .15s;
        transition-delay: .15s;
    }

    // 当data-tip 没有内容的时候隐藏
    [data-tip=""]::before,
    [data-tip=""]::after {
        display: none !important;
    }
*/
</style>