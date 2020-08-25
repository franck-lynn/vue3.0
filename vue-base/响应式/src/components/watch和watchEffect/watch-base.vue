<template>
    <!-- 侦听器, 数据变化时异步或开销较大的操作 -->
    <!-- 需求, 姓名改变后后面的全名跟着变化 -->
    <div>
        <span>名: </span>
        <span>
            <input type="text" v-model="firstname">
        </span>
    </div>
    <div>
        <span>姓: </span>
        <span>
            <input type="text" v-model="lastname">
        </span>
    </div>
    <div> {{fullname}} </div>
</template>
 
<script>
    import { defineComponent, ref, watch } from 'vue'
    export default defineComponent({
        name: 'watch-base',
        props: { 
        },
        setup(){
            const firstname = ref('Jim')
            const lastname = ref('Green')
            const fullname = ref('Jim Green')
            watch(
                // 侦听多个数据
                [firstname, lastname],
                ([newFirstname, newLastName], [prevFirstname, prevLastname]) => {
                    // 更改之前的数据, 更改之后的数据
                    console.log("新的值---> ", newFirstname, newLastName)
                    console.log("old value ---< ", prevFirstname, prevLastname)
                    
                    fullname.value = `${newFirstname} --- ${newLastName}`
                }
            )
            return {firstname,  lastname, fullname }
        }
    })
</script>
 
<style lang="scss" scoped>
    div{
        margin: 20px;
    }
</style>