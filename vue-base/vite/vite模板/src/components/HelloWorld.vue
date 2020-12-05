<template>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    import path from 'path'
    import fs from "fs";
    export default defineComponent({
        name: 'HelloWorld',
        props: {msg: String},
        setup() {
            const count = ref(0)
            console.log(path, fs)
            return {count}
        }
    })
</script>