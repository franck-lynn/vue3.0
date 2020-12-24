<template>
    <div id="prefetch">
        <input class="typeahead" type="text" placeholder="请输入国家名称">
    </div>
</template>

<script>
    import Bloodhound from 'corejs-typeahead/dist/bloodhound';
    // 实际上是用到的, 是 $('#the-basics .typeahead').typeahead 的依赖
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import typeahead from 'corejs-typeahead/dist/typeahead.jquery';
    import countries_cn from '../../data/countries_cn.json'
    import { defineComponent, nextTick } from 'vue'
    export default defineComponent({
        name: 'import-from-local',
        props: {},
        setup() {
            const countries = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                // url points to a json file that contains an array of country names, see
                // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
                // prefetch: 'https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json'
                local: countries_cn // 导入的本地的数据
            })
            // passing in `null` for the `options` arguments will result in the default
            // options being used
            nextTick(() => {
                $('#prefetch .typeahead').typeahead(null, {
                    name: 'countries',
                    source: countries
                });
            })

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>