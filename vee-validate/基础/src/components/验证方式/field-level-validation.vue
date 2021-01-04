<template>
    <h1>字段级验证</h1>
    <Form v-slot="{errors}">
        <!-- field 需要一个 name 属性, 否则报错 -->
        <Field name="field" as="input" :rules="isRequired"></Field>
        {{errors.field}}
    </Form>
</template>

<script>
    import { Field, Form } from 'vee-validate';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Field, Form, },
        name: 'field-level-validation',
        props: {},
        setup() {
            const isRequired = (value) => value ? true : 'This field is required';
            return { isRequired }
        }
    })
</script>

<style lang="scss" scoped>

</style>