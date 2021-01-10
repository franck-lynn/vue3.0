<template>
    <h1>合成API -- {{value}}</h1>
    <div>
        <input type="text" v-model="value" />
        <span>{{ errorMessage }}</span>
    </div>
</template>

<script>
    import { useField } from 'vee-validate'
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'use-field',
        props: {},
        setup() {
            function validate(value) {
                if (!value) {
                    return '这个字段需要';
                }
                if (value.length < 3) { return '至少需要3个字符'; }
                return true;
            }
            const { value, errorMessage } = useField('fieldName', validate);

            return { value, errorMessage, }
        }
    })
</script>

<style lang="scss" scoped>

</style>