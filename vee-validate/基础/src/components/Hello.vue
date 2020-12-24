<template>
<Form v-slot="{ errors }">
    <Field name="field" as="input" :rules="isRequired" />
    <span>{{ errors.field }}</span>
</Form>
</template>

<script>
    // https://vee-validate.logaretm.com/v4
    import { defineComponent } from 'vue'
    import { Field, Form } from 'vee-validate'
    export default defineComponent({
        name: 'Hello',
        components: { Field, Form },
        props: {},
        setup() {
            const isRequired = (value) => value ? true : 'This field is required';
            return {isRequired}
        }
    })
</script>

<style lang="scss" scoped>

</style>