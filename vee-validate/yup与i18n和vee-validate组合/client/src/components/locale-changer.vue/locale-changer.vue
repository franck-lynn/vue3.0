<template>
    <div class="locale-changer">
        <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang"> {{lang}} </option>
        </select>
    </div>
</template>
 
<script>
    
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'locale-changer',
        props: { 
        },
        setup(){
            const langs = ref(['en', 'cn'])
            return { langs }
        }
    })
</script>
 
<style lang="scss" scoped>
    
</style>