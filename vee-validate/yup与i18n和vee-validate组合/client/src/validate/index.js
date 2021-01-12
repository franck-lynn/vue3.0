import { setLocale } from 'yup'
// https://github.com/jquense/yup/issues/71
// https://github.com/jquense/yup/issues/623
// https://github.com/jquense/yup/issues/618
// https://github.com/jquense/yup/issues/750
// https://github.com/jquense/yup/issues/59
const setLocaleValidate = async (t) => {
    setLocale({
        mixed: {
            default: () => {
                console.log("required字段")
                t('login.requiredEmail')
            },
            required: () => t('login.requiredEmail')
        },
        number: {
            // min: params => {
            //     console.log("传入的参数是: ", params)
            //     return t('number.min', {min: params.min})
            // },
            min: ({ min }) => {
                console.log("传入的参数", min)
                return t('number.min', {min})
            }
        }
    })
}
export { setLocaleValidate }