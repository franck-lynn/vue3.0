<template>
    <button :class="['icon-button', 'info-number', 
      {'dropdown-menu__active': isActive, 'dropdown-toggle': isShow}]" @click="dropdown">
        <span class="iconfont icon-global"></span>
    </button>

    <div :class="['dropdown-list', {'dropdown-list__active': isActive,'dropdown-list__show': isShow}]">
        <h5 class="title"> {{ t('langs.language') }}</h5>
        <ul class="sub-list">
            <li v-for="(item, index) in items" :key="index" :class="{'sub-item-active': isCurrentTag(currentLocale, item)}" @click="handleCurrentTarget">
                <a href="javascript:void(0)" class="dropdown-toggle lang-info" data-toggle="dropdown">
                    <span :class="`flag-icon flag-icon-small flag-icon-${item}`"></span>
                    <span :id="item" class="locale-lang"> {{t(`langs.${item}`)}} </span>
                </a>
            </li>
        </ul>
    </div>

</template>

<script>
    import { i18n, SUPPORT_LOCALES, setI18nLanguage, loadLocaleMessages } from '../../i18n'
    import { useI18n } from 'vue-i18n'
    import { defineComponent, ref, watchEffect } from 'vue'
    import {setLocaleValidate} from '../../validate'
    
    export default defineComponent({
        name: 'locale-changer',
        props: {},
        setup() {
            const { t, locale } = useI18n({ useScope: 'global' })
            const currentLocale = ref(localStorage.getItem('lang') || locale.value)
            // onMounted(async () => {
            //     console.log("加载后就进行设置", currentLocale.value)
            //     await setLocaleValidate(currentLocale.value)
            // })

            // setLocale({
            //     number: {
            //         min: '不小于 ${min}',
            //     },
            // })

            watchEffect(async () => {
                const currentLang = currentLocale.value
                //! 异步加载语言包
                await loadLocaleMessages(i18n, currentLang)
                //! 加载好后再设置语言
                setI18nLanguage(i18n, currentLang)
                localStorage.setItem('lang', currentLang)
                await setLocaleValidate(t)
            })

            const isActive = ref(false)
            const isShow = ref(false)

            const isCurrentTag = (currentLocale, item) => {
                // 是当前组件, 设置到 localStorge 中去
                return currentLocale ? currentLocale === item : false
            }
            const handleCurrentTarget = (e) => {
                e.stopPropagation() // 阻止事件传播
                e.preventDefault()
                let langName = process.env.VUE_APP_I18N_LOCALE || 'cn'
                if (e.target.className.includes('locale-lang')) {
                    langName = e.target.id
                }
                if (e.target.className.includes('flag-icon')) {
                    // 如果点击到在 国旗上, 则找其下一个兄弟节点
                    langName = e.target.nextElementSibling.id
                }
                if (e.target.className.includes('lang-info')) {
                    // 如果点击到了 a 标签上, 则找最后一个子元素
                    langName = e.target.lastElementChild.id
                }
                currentLocale.value = langName
            }


            const dropdown = () => {
                // 获取点击元素的下一个兄弟节点, 判断这个节点的数据 是否和 当前节点一致, 依此判断是不是当前节点
                // console.log("子组件被点击了", e.currentTarget.parentNode.querySelector('.title').innerHTML)
                // currentLocale.value = e.currentTarget.parentNode.querySelector('.title').innerHTML
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
                isCurrentTag,
                handleCurrentTarget,
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
    $width-dropdown-menu: 180px; // 下来菜单的宽度
    $offset-right-icon-btn: 0px; // icon-btn 距离右侧宽度
    $color-dropdown-menu-color: #65cea7;
    $height-dropdown-list: 180px;


    a {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    // =======水平菜单栏按钮图标部分开始=======
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

    // =======水平菜单栏按钮图标部分结束=======

    // 现在显示未激活时的状态
    .dropdown-list {
        visibility: hidden; // 代替display 实现过渡效果
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
            font-size: 0.8rem;
            color: #fff;
            background-color: $color-dropdown-menu-color;
            padding-left: 10px;
        }

        // dropdown-list 下的 sub-list
        .sub-list {
            border: {
                width: 0 1px 1px 1px;
                style: solid;
                color: #ddd;
            }

            display: flex;
            flex-direction: column;

            >li {
                display: flex;
                flex-direction: column;
                width: 100%;

                &+li {
                    border-top: 1px solid #eee; // 分割线
                }

                &.sub-item-active {
                    background-color: #f0d2ce; // 激活时的背景色
                }

                .lang-info {
                    // font-size: 16px; //信息栏
                    font-size: 0.725rem;
                    color: #424f63;
                    padding: 10px;

                    :last-child {
                        // display: flex;
                        padding-left: 6px;
                    }

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