<template>
    <div id="default-suggestions">
        <input class="typeahead" type="text" placeholder="NFL Teams">
    </div>
</template>

<script>
    import Bloodhound from 'corejs-typeahead/dist/bloodhound'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import typeahead from 'corejs-typeahead/dist/typeahead.jquery'
    import nfl from '../../data/nfl.json'

    import { defineComponent, nextTick } from 'vue'
    export default defineComponent({
        name: 'default-suggestion',
        props: {},
        setup() {
            const nflTeams = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                identify: function(obj) { return obj.team; },
                local: nfl
            })
            const nflTeamsWithDefaults = (q, sync) => {
                if (q === '') {
                    // 没有输入的时候从这里拿
                    sync(nflTeams.get('Detroit Lions', 'Green Bay Packers', 'Chicago Bears'));
                } else {
                    // 有输入的时候叫猎狗去拿
                    nflTeams.search(q, sync)
                }
            }
            nextTick(() => {
                $('#default-suggestions .typeahead').typeahead({
                    minLength: 0,
                    highlight: true
                }, {
                    name: 'nfl-teams',
                    display: 'team',
                    source: nflTeamsWithDefaults
                });
            })
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>