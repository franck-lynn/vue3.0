<template>
    <button :class="['icon-button', 'info-number', {'dropdown-menu__active': isActive, 'dropdown-toggle': isShow}]" @click="dropdown">
        <span class="iconfont icon-global"></span>
    </button>

    <div :class="['dropdown-list', {'dropdown-list__active': isActive,'dropdown-list__show': isShow}]">
        <h5 class="title"> {{ t('labels.language') }}</h5>
        <ul class="sub-list">
            <li class="new" v-for="(item, index) in items" :key="index">
                <a href="javascript:void(0)" class="dropdown-toggle info-number" data-toggle="dropdown">
                    <span class="flag-icon flag-icon-small flag-icon-cn"></span>
                    <span> {{item}} </span>
                </a>
            </li>
        </ul>
    </div>



    <label>{{ t('labels.language') }}</label>
    <select v-model="currentLocale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang"> {{lang}} </option>
    </select>
</template>

<script>
    import { i18n, SUPPORT_LOCALES, setI18nLanguage, loadLocaleMessages } from '../../i18n'
    import { useI18n } from 'vue-i18n'
    import { defineComponent, ref, watchEffect } from 'vue'

    export default defineComponent({
        name: 'locale-changer',
        props: {},
        setup() {
            const { t, locale } = useI18n({ useScope: 'global' })
            const currentLocale = ref(localStorage.getItem('lang') || locale.value)
            watchEffect(async () => {
                const currentLang = currentLocale.value
                //! 异步加载语言包
                await loadLocaleMessages(i18n, currentLang)
                //! 加载好后再设置语言
                setI18nLanguage(i18n, currentLang)
                localStorage.setItem('lang', currentLang)
            })

            const isActive = ref(false)
            const isShow = ref(false)
            const dropdown = (e) => {
                // 获取点击元素的下一个兄弟节点, 判断这个节点的数据 是否和 当前节点一致, 依此判断是不是当前节点
                console.log("子组件被点击了", e.currentTarget.parentNode.querySelector('.title').innerHTML)
                currentLocale.value = e.currentTarget.parentNode.querySelector('.title').innerHTML
                isActive.value = true
                isShow.value = !isShow.value
            }
            return {
                t,
                locale,
                currentLocale,
                langs: SUPPORT_LOCALES,
                items: SUPPORT_LOCALES,
                isActive,
                isShow,
                dropdown
            }
        }
    })
</script>

<style lang="scss" scoped>
    // 导入国旗图案
    @import '~flag-icon-css/css/flag-icon.css';

    $icon-font-size: 25px; // 水平导航条图标的宽高字体尺寸
    $height-icon-btn: 45px; // 水平导航条高度
    $width-dropdown-menu: 120px; // 下来菜单的宽度
    $offset-right-icon-btn: 0px; // icon-btn 距离右侧宽度
    $color-dropdown-menu-color: #65cea7;
    $height-dropdown-list: 180px;


    a {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

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
    }

    // =======按钮图标部分结束=======
    // 现在显示未激活时的状态
    .dropdown-list {
        // display: none;
        visibility: hidden; // 代替display 实现过渡效果
        // overflow: hidden; // 要去掉, 不然, 伪类的向上小三角显示不出来
        max-height: 0; // 代替display 实现过渡效果
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
            height: 40px;
            font-size: 0.725rem;
            color: #fff;
            background-color: $color-dropdown-menu-color;
            padding-left: 10px;
        }

        // dropdown-list 下的 dropdown-list
        .sub-list {
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

                    // .task-info {
                    //     >* {
                    //         white-space: nowrap;
                    //         overflow: hidden;
                    //         text-overflow: ellipsis;
                    //     }
                    // }

                    &:hover {
                        color: $color-dropdown-menu-color;

                        //! 搜索关键词: 悬停提示, css实现了hover显示title的效果
                        //! 哪个元素上设置了 title 属性, 就在哪个类上加 ::after 伪类, 实现悬停的提示
                        // https://blog.csdn.net/qq_41499782/article/details/106827037
                        // https://www.cnblogs.com/horanly/p/6101283.html
                    }
                }



                // &:last-child {
                //     display: flex;
                //     font-size: 14px;
                //     justify-content: center;
                //     padding-left: 10px;
                //     height: 40px;
                // }
            }
        }

        // 激活时的状态
        &.dropdown-list__show {
            visibility: visible;
            max-height: $height-dropdown-list; // 代替display 实现过渡效果
            box-shadow: 8px 8px 4px #888888; // 添加阴影效果
            border-radius: 2px;

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
</style>