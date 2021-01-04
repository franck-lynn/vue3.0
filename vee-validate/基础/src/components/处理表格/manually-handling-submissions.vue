<template>
    <h1>该handleSubmit插槽道具，可能是你将使用手工处理表单提交的最常用的方法，
        它接受将与表单值，如果表单有效执行的回调。</h1>
    <h1>处理提交意思是指先处理表单数据, 再通过 fetch 处理提交</h1>
    <VeeForm v-slot="{ errors, handleSubmit }" :validation-schema="schema" as="div">
        <!--VeeForm 作为了一个 div 的标签 -->
        <form @submit="handleSubmit($event, onSubmit)">
            <Field name="email" as="input" type="email" />
            <Field name="name" as="input" />
            <Field name="password" as="input" type="password" />
            {{errors.password}}
            <button>Submit</button>
        </form>
    </VeeForm>
</template>

<script>
    import { Form as VeeForm, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: {
            // Rename form to avoid confusion with native `form`
            VeeForm,
            Field,
        },
        name: 'manually-handling-submissions',
        props: {},
        setup() {
            const schema = yup.object().shape({
                email: yup.string().required().email(),
                name: yup.string().required(),
                password: yup.string().required().min(8),
            });
            const onSubmit = values => {
                // Submit values to API...
                console.log(values);
            }
            return {
                schema,
                onSubmit
            };
        }
    })
</script>

<style lang="scss" scoped>

</style>