<template>
    <nav>
        <div class="navigation">
            <router-link :to="{ name: 'home', params: { locale } }">
                {{ t('navigations.home') }}
            </router-link>
            |
            <router-link :to="{ name: 'about', params: { locale } }">
                {{ t('navigations.about') }}
            </router-link>
        </div>
        <form class="language">
            <label>{{ t('labels.language') }}</label>
            <select v-model="currentLocale">
                <option v-for="optionLocale in supportLocales" :key="optionLocale" :value="optionLocale">
                    {{ optionLocale }}
                </option>
            </select>
        </form>
    </nav>

</template>

<script>
    import { i18n, SUPPORT_LOCALES, setI18nLanguage, loadLocaleMessages } from '../i18n'
    import { useI18n } from 'vue-i18n'
    import { defineComponent, ref, watchEffect } from 'vue'
    export default defineComponent({
        name: 'local-lang',
        props: {},
        setup() {
            //! 导入的 SUPPORT_LOCALES 用于 select 标签
            // console.log("支持的语言---> ", SUPPORT_LOCALES)
            const { t, locale } = useI18n({ useScope: 'global' })

            const currentLocale = ref(localStorage.getItem('lang') || locale.value)
            //! 当前的语言
            // console.log("当前的语言---> ", currentLocale.value)
            //! 立即执行语言的设置程序, 从客户浏览器的数据库中获取语言选项, 这样
            //! 客户打开浏览器后就是所需要的语言
            watchEffect(async () => {
                const currentLang = currentLocale.value
                //! 异步加载语言包
                await loadLocaleMessages(i18n, currentLang)
                //! 加载好后再设置语言
                setI18nLanguage(i18n, currentLang)
                localStorage.setItem('lang', currentLang)
            })

            // watch(currentLocale, async (currentLang) => {
            //     //! 这里切换语言是异步的
            //     // console.log("新的语言", n)
            //     // console.log("旧的语言", o)
            //     //! 异步加载语言包
            //     await loadLocaleMessages(i18n, currentLang)
            //     //! 加载好后再设置语言
            //     setI18nLanguage(i18n, currentLang)
            //     localStorage.setItem('lang', currentLang)
            // }, {
            //     flush: 'pre'
            // })
            // 在 i18n 文件夹下的 index.js 文件中配置了 globalInjection: true,
            // 全局注入, 这样, 不用在每个组件中使用 const { t } = useI18n()
            return { t, locale, currentLocale, supportLocales: SUPPORT_LOCALES }
        }
    })
</script>

<style lang="scss" scoped>

</style>