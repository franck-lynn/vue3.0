<template>
    <table class="table">
        <thead>
            <tr>
                <th>序号</th>
                <th>数量</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in data" :key="index">
                <td v-for="(cell, index) in row" :key="index" contenteditable="true" @input="changeValue"> {{cell}} </td>
            </tr>
        </tbody>
        
        
    </table>
    
    {{data}}
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'reactive-table',
        props: {},
        setup() {
            const data = ref([
                { id: 1, qty: 10 },
                { id: 2, qty: 20 },
                { id: 3, qty: 30 },
            ])
            const changeValue = (e) => {
                console.log("获取内容改变的标签里的值", e.target.innerHTML)
                const id = e.target.parentElement.firstElementChild.innerHTML
                // console.log("获取对应的id: ", id)
                // 根据id 查找 data 数据, 修改对应的部分
                data.value.map(item => {
                    if(item.id === parseInt(id)){
                        item.qty = e.target.innerHTML
                    }
                    return item
                })
            }
            return { data, changeValue }
        }
    })
</script>

<style lang="scss" scoped>
td{
    outline-color: red;
}
</style>