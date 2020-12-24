<template>
    <label for="locale">locale</label>
    <select v-model="locale">
        <option>cn</option>
        <option>en</option>
    </select>
    <div id="string-syntax">
        <p>{{ t('named', { msg }) }}</p>
        <p>{{ t('list', [msg]) }}</p>
        <p>{{ t('literal') }}-- 字面量格式</p>
        <p>{{ t('linked') }}</p>
    </div>
    <h2>Car:</h2>
    <p>{{ t('car', 1) }}</p>
    <p>{{ t('car', 2) }}</p>
    <h2>Apple:</h2>
    <p>{{ t('apple', 0) }}</p>
    <p>{{ t('apple', 1) }}</p>
    <p>{{ t('apple', { count: 10 }, 10) }}</p>
    <p>{{ t('apple', 10) }}</p>
    <h2>Banana:</h2>
    <p>{{ t('banana', { n: 1 }, 1) }}</p>
    <p>{{ t('banana', 1) }}</p>
    <p>{{ t('banana', { n: 'too many' }, 100) }}</p>

    <h1>日期时间格式</h1>
    <p>{{ t('current') }}: {{ d(now, 'long') }}</p>
</template>

<script>
    import { computed, defineComponent, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    export default defineComponent({
        name: 'string-syntax',
        props: {},
        setup() {
            const { d, t, locale } = useI18n({
                // locale: 'cn', // 全局设置后这里设置不受影响, 会继承全局的设定
                // messages 也可以放在全局, 在全局里去找
               
                // messages: {
                //     cn: {
                //         msg: "中文",
                //         named: "{msg}中文",
                //         list: "{0} 中文!",
                //         literal: "{'hello'} 中文!!",
                //         // the_world: "中文!!!",
                //         // dio: "DIO中文",
                //         // linked: '@:dio @:the_world 中文！！！！'
                //     },
                //     en: {
                //         msg: 'こんにちは',
                //         named: '{msg} 日文',
                //         list: '{0} 日文',
                //         literal: "{'こんにちは'} 日文!",
                //         the_world: 'ザ・ワールド！',
                //         dio: 'ディオ 日文dio:',
                //         linked: '@:dio @:the_world 日文！！！！'
                //     }
                // }

            })
            const msg = computed(() => t('msg'))
            const now = ref(new Date())
            return { d, t, msg, locale, now }
        }
    })
</script>

<style lang="scss" scoped>

</style>