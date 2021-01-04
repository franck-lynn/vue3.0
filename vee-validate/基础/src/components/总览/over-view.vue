<template>
    <h1>概览</h1>
    <div id="app">
        <Form v-slot="{ errors }">
            <Field name="field" as="input" :rules="isRequired" />
            <span>{{ errors.field }}</span>
        </Form>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { Field, Form } from 'vee-validate';

    export default defineComponent({
        components: { Form, Field, },
        name: 'over-view',
        props: {},
        setup() {
            const isRequired = (value) => value ? true : 'This field is required';
            return { isRequired }
        }
    })
</script>

<style lang="scss" scoped>

</style>