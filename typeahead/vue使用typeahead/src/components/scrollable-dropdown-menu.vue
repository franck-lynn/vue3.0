<template>
    <div id="scrollable-dropdown-menu">
        <input class="typeahead" type="text" placeholder="Countries">
    </div>
</template>

<script>
    import Bloodhound from 'corejs-typeahead/dist/bloodhound'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import typeahead from 'corejs-typeahead/dist/typeahead.jquery'
    import countries_cn from '../../data/countries_cn.json'

    import { defineComponent, nextTick } from 'vue'
    export default defineComponent({
        name: 'scrollable-dropdown-menu',
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
            nextTick(() => {
                $('#scrollable-dropdown-menu .typeahead').typeahead(null, {
                    name: 'countries',
                    limit: 3,
                    source: countries
                });
            })
            return {}
        }
    })
</script>

<style lang="scss">
    #scrollable-dropdown-menu .tt-suggestion {
        max-height: 120px;
        overflow-y: auto;
        background: red;
    }
</style>