<template>
    <li>
        <button :class="['profile-button',  {'dropdown-menu__active': currentTag === '林芮应'}]" @click="changeParent">
            <img src="../../scss/images/gaoyuanyuan.png" alt="background-image" />
            <span class="username">林芮应</span>
        </button>
        <ul :class="['dropdown-list', {'dropdown-list__active': currentTag === '林芮应','dropdown-list__show': isShow}]">
            <li><a href="#"><span class="iconfont icon-cogs"></span> Profile</a></li>
            <li><a href="#"><span class="iconfont icon-cogs"></span> Settings</a></li>
            <li><a href="#"><span class="iconfont icon-cogs"></span> Log Out</a></li>
        </ul>
    </li>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'profile',
        props: { currentTag: {type: String, default: ''} },
        setup(props, ctx) {
            const isActive = ref(false)
            const isShow = ref(false)
            const changeParent = (e) => {
                // 获取点击元素下的 username
                console.log(e.currentTarget.lastChild.innerHTML)
                console.log("子元素发射事件获取父组件中的当前元素: ", props.currentTag)
                // 发射给父组件信息, 通知父组件更改 currentTag 当前标签
                // props.currentTarget = e.currentTarget.lastChild.innerHTML
                ctx.emit('changeCurrentTag', e.currentTarget.lastChild.innerHTML)

                // isActive.value = true
                isShow.value = !isShow.value
            }
            return { isActive, isShow, changeParent }
        }
    })
</script>

<style lang="scss" scoped>
    $icon-font-size: 25px; // 水平导航条图标的宽高字体尺寸
    $height-icon-btn: 45px; // 水平导航条高度
    $width-dropdown-list: 220px; // 下来菜单的宽度
    $offset-right-icon-btn: 0px; // icon-btn 距离右侧宽度
    $color-dropdown-list-color: #65cea7;
    $height-dropdown-list: 180px;

    a {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    li {
        list-style-type: none;
        position: relative; // 给下来菜单用的定位

        // margin-right: $offset-right-icon-btn;
        .dropdown-list__active {

            // 显示下拉菜单
            // 只有在激活状态下才可以显示下来菜单, 所以需要两个状态, 一个判断是否激活, 一个判断是否显示
            &.dropdown-list__show {
                visibility: visible;
                max-height: $height-dropdown-list; // 代替display 实现过渡效果
                box-shadow: 8px 8px 4px #888888; // 添加阴影效果
                border-radius: 2px;

                // display: block;
                &::before {
                    visibility: visible;
                }
            }
        }

        .profile-button {
            width: 120px;
            height: $height-icon-btn;
            border: none;
            outline: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            margin-right: $offset-right-icon-btn;

            &:hover {
                background-color: #424f63;
                color: $color-dropdown-list-color;

                .username::after {
                    border-color: $color-dropdown-list-color transparent transparent transparent;
                }
            }

            img {
                width: $icon-font-size + 8px;
                height: $icon-font-size + 8px;
            }

            .username::after {
                $little-triangle-width: 6px; // 用户名旁边的小三角
                content: '';
                width: 0;
                height: 0;
                font-size: 0;
                line-height: 0;
                // border: 2px solid red;
                border-width: $little-triangle-width;
                border-style: solid dashed dashed dashed;
                border-color: #424f63 transparent transparent transparent;
                margin-left: 8px;
            }
        }

        // 仅当 li 激活时才显示
        // 现在显示未激活时的状态
        .dropdown-list {
            // 下拉的菜单
            // display: none;
            visibility: hidden; // 代替display 实现过渡效果
            //  overflow: hidden; // 要去掉, 不然, 伪类的向上小三角显示不出来
            max-height: 0; // 代替display 实现过渡效果
            transition: all .2s linear; // 代替display 实现过渡效果

            position: absolute;
            top: $height-icon-btn; // 下来菜单紧贴水平导航条.
            right: $offset-right-icon-btn; // 与 icon-btn 右对齐
            width: $width-dropdown-list;
            background-color: $color-dropdown-list-color;
            height: $height-dropdown-list;

            >li {
                $length-dropdown-menu-list: 8px;
                margin: $length-dropdown-menu-list;
                line-height: $height-dropdown-list / 3 - 2 * $length-dropdown-menu-list;

                a {
                    color: white;

                    // font-size: 16px;
                    .iconfont {
                        padding: 10px;
                    }
                }

                // border: 1px solid red;
                &:hover {
                    background-color: #424f63;
                }
            }

            &::before {
                $little-triangle-width: 6px;
                content: ''; // 向上的小三角符号
                width: 0;
                height: 0;
                font-size: 0;
                line-height: 0;
                border-width: $little-triangle-width;
                border-style: dashed dashed solid dashed;
                border-color: transparent transparent $color-dropdown-list-color transparent;
                position: absolute;
                top: - 2 * $little-triangle-width;
                right: $height-icon-btn / 2 - $little-triangle-width;
                // https://blog.csdn.net/m0_37639199/article/details/74316089
                visibility: hidden;
                transition: all .2s linear; // 代替display 实现过渡效果
            }
        }


        // profile-button 按钮有一个激活状态, 用于调整激活与非激活状态的颜色, 而不需要显示与否
        .dropdown-menu__active {
            background-color: #424f63;
            color: $color-dropdown-list-color;

            // 和 profile-button 是同一个元素, 这个是激活状态
            .username::after {
                border-color: $color-dropdown-list-color transparent transparent transparent;
            }
        }
    }

    @media screen and (max-width: 768px) and (min-width: 320px) {}
</style>