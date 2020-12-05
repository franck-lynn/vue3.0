<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="(item, index) in thead" :key="index">{{item}} </th>
            </tr>
        </thead>
        <tbody v-for="(items, index) in info" :key="index">
            <tr>
                <th colspan="8"> {{items.contracts_no}} -- {{items.customer}} -- {{items.contract_state}}</th>
            </tr>
            <tr v-for="(row, index) in items.details" :key="index">
                <th v-for="(cell, index) in row" :key="index"> {{cell}} </th>
            </tr>
        </tbody>
    </table>
    <!-- {{info}} -->
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    import { thead } from "./utils/thead";
    export default defineComponent({
        name: 'fetch-post',
        props: {},
        setup() {
            const info = ref(null)
            onMounted(() => {
                fetch('/contracts').then(response => {
                    return response.json()
                }).then(myJson => {
                    info.value = myJson
                })
                // 增加数据
                let data = {
                    "item": "10", 
                    "description": "三面刃铣刀",
                    "catalog_number": "WEX315",
                    "price": 6000,
                    "amount": 12000.00,
                    "qty": 2,
                    "remark": "定制"
                }
                
                fetch('/contracts', {
                    method: 'POST',
                    // mode: 'cors',
                    header: {'content-type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(res => res.json())
                  .then(res => console.log("success", res))
                  .catch(error => console.error('Error:', error))
            })
            return { thead, info }
        }
    })
</script>

<style lang="scss" scoped>

</style>