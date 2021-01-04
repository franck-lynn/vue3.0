<template>
    <h1> 如果没有部署侦听器, 则vee-validate 会按照页面重新加载的方式提交表单 </h1>
    <Form method="post" action="#" v-slot="{errors}" :validation-schema="schema">
        <Field name="email" as="input" />
        <Field name="name" as="input" type="email" />
        <Field name="password" as="input" type="password" />
        {{errors.password}}
        <button @click="getData(formsData)">Submit</button>
    </Form>
</template>

<script>
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';
    import { defineComponent } from 'vue'
    export default defineComponent({
        components: { Form, Field },
        name: 'handling-submissions',
        props: {},
        setup() {
            const schema = yup.object().shape({
                email: yup.string().required().email(),
                name: yup.string().required(),
                password: yup.string().required().min(8),
            });
            const getData = (values) => {
                console.log(values)
                // alert(JSON.stringify(values))
            }
            return { schema, getData }
        }
    })
</script>

<style lang="scss" scoped>

</style>