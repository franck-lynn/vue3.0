<template>
    <div id="multiple-datasets">
        <input class="typeahead" type="text" placeholder="NBA and NHL teams">
    </div>
</template>

<script>
    import Bloodhound from 'corejs-typeahead/dist/bloodhound'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import typeahead from 'corejs-typeahead/dist/typeahead.jquery'
    import nfl from '../../data/nhl.json'
    import nba from '../../data/nba.json'

    import { defineComponent, nextTick } from 'vue'
    export default defineComponent({
        name: 'multiple-datasets',
        props: {},
        setup() {
            const nhlTeams = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: nfl
            })
            const nbaTeams = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: nba
            })
            nextTick(() => {
                $('#multiple-datasets .typeahead').typeahead({
                    highlight: true
                }, {
                    name: 'nba-teams',
                    display: 'team',
                    source: nbaTeams,
                    templates: {
                        header: '<h3 class="league-name">NBA Teams</h3>'
                    }
                }, {
                    name: 'nhl-teams',
                    display: 'team',
                    source: nhlTeams,
                    templates: {
                        header: '<h3 class="league-name">NHL Teams</h3>'
                    }
                });
            })
            return {}
        }
    })
</script>

<style lang="scss">
    // 由于这里的 DOM 不是 vue 操作的, 所以, 要去掉 scoped 样式文件才起作用
    #multiple-datasets .league-name {
        margin: 0 20px 5px 20px;
        padding: 3px 0;
        border-bottom: 1px solid #ccc;
    }
</style>