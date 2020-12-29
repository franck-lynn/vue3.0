<template>
    <SchemaForm :schema="mySchema" v-model="formData" />
</template>

<script>
    // https://formvuelate.js.org/#schemaform
    import { SchemaForm, SchemaWizard, SchemaFormFactory } from 'formvuelate'
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        components: { SchemaForm, SchemaWizard, SchemaFormFactory },
        name: 'schema-form',
        props: {},
        setup() {
            const formData = ref({})
            const mySchema = ref({
                name: {
                    component: FormText
                },
                lastName: {
                    component: FormText
                }
            })
            return { formData, mySchema }
        }
    })
</script>

<style lang="scss" scoped>

</style>