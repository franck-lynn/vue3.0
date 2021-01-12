import { setLocale } from 'yup'
import { nextTick } from 'vue'
// 验证支持的语言和 i18n 的保持一致
import { supportLocales } from '../i18n/helper'

const setLocaleValidate = async (locale) => {
    //! 导入 json5 文件, 验证文件的名称命名约定: xx(语言简称)-validations.json5
    if (!locale) {
        return
    }
    if (locale === 'en' || locale === 'gb') {
        return
    }
    
    // cn-validations
    const messages = await import(`./${locale}-validations.js`)
    setLocale(messages)
    console.log("来到这里进行设置", locale)
    // setLocale(validate)
    return nextTick()
}

export { setLocaleValidate }