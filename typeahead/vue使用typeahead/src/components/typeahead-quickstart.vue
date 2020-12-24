<template>
    <div id="bloodhound">
        <input class="typeahead" type="text" placeholder="States of USA">
    </div>
</template>

<script>
    import { defineComponent, nextTick } from 'vue'
    // https://github.com/corejavascript/typeahead.js
    // https://github.com/TarekRaafat/autoComplete.js
    // https://github.com/kraaden/autocomplete
    // https://digitalfortress.tech/js/using-twitter-typeahead-with-vuejs/
    // https://scotch.io/@bedakb/lets-build-type-ahead-component-with-vuejs-2-and-fetch-api
    // https://digitalfortress.tech/js/using-twitter-typeahead-with-vuejs/
    import Bloodhound from 'corejs-typeahead/dist/bloodhound';
    // 实际上是用到的, 是 $('#the-basics .typeahead').typeahead 的依赖
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import typeahead from 'corejs-typeahead/dist/typeahead.jquery';

    export default defineComponent({
        name: 'typeahead-quickstart',
        props: {},
        setup() {
            const countries = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
                'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
            ];
            let states = new Bloodhound({
                // 数据标记器
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                // 查询标记器
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                // states是一个国家的数组,定义在basic
                local: countries // 定义的数据库,让猎犬在哪里找
            });
            // nextTick 是在 页面中所有DOM都被渲染后才被执行, 所以可以拿到 DOM,
            // 那么, 为什么 onMounted 里面调用 jquery 就不能执行了呢? 
            // 可能的原因是 onMounted 是加载, 当加载完成后也就结束了, 不执行里面的函数了
            nextTick(() => $('#bloodhound .typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1 // 第几个数字开始触发
            }, {
                name: 'states', // 名称
                source: states // 寻血猎犬的函数
            }))
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>