<template>
    <label for="locale">locale</label>
    <select v-model="$i18n.locale">
        <option>cn</option>
        <option>en</option>
    </select>
    <p>{{ $t("message.hello") }}</p>
</template>

<script>
    import { defineComponent } from 'vue'
    // import { useI18n } from 'vue-i18n'
    export default defineComponent({
        name: 'local-lang',
        props: {},
        setup() {
            // 在 i18n 文件夹下的 index.js 文件中配置了 globalInjection: true,
            // 全局注入, 这样, 不用在每个组件中使用 const { t } = useI18n()
            // const { t } = useI18n() // call `useI18n`, and spread `t` from `useI18n` returning
            return { /* t, */ }
        }
    })
</script>

<style lang="scss" scoped>

</style>