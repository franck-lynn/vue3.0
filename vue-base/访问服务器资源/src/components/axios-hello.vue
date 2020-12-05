<template>
    <div id="app">
        <!-- <h1>Bitcoin Price index</h1> -->
        <h1>比特币价格</h1>
        <section v-if="errored">
            <p>没有加载到</p>
        </section>
        <section v-else>
            <div v-if="loading"> 加载中... </div>

            <div v-else v-for="(currency, index) in info" :key="index">
                {{currency.description}}
                <span class="lighten">
                    <span v-html="currency.symbol"></span> {{ currencydecimal(currency.rate_float) }}
                </span>
            </div>
        </section>


    </div>

</template>

<script>
    import { computed, defineComponent, onMounted, ref } from 'vue'
    import axios from "axios";
    export default defineComponent({
        name: 'axios-hello',
        props: {},
        setup() {
            const info = ref(null)
            const loading = ref(true)
            const errored = ref(false)
            // 计算属性传参
            const currencydecimal = computed(() => value => value.toFixed(2))
            onMounted(async () => {
                try {
                    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
                    info.value = response.data.bpi
                    loading.value = false
                } catch (error) {
                    console.log(error)
                    errored.value = true
                } 
            })

            return { info, currencydecimal, loading, errored }
        }
    })
</script>

<style lang="scss" scoped>
    #app {
        margin-top: 20px;
        width: 300px;
        padding: 0 40px 40px;
        background: #2F242C;
        border-radius: 5px;
        color: #B3BFB8;

        h1 {
            color: #F0F7F4;
            font-size: 2em;
            margin: .67em 0;
            display: block;
            margin-block-start: 0.67em;
            margin-block-end: 0.67em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
        }

        .lighten {
            color: white;
        }
    }
</style>