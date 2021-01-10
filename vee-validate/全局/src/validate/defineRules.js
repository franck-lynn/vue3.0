import { defineRule, configure } from 'vee-validate'
// reuqired 写错了
import {  email, minLength, confirmed } from './rules'
import { required } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';


// defineRule('required', reuqired)
defineRule('required', required)
defineRule('email', email)
//! 'min' 的名称要和 字段中 rules 的名称一致才可以
defineRule('min', minLength)

// 跨字段验证
defineRule('confirmed', confirmed)

// 导入很多的 vee-validate 定义好的验证规则
// import * as rules from '@vee-validate/rules';
// Object.keys(rules).forEach(rule => {
//     defineRule(rule, rules[rule]);
// });

//! 这样也是可以的
import { alpha } from '@vee-validate/rules'
let rules = [{alpha}]
rules.forEach(rule => {
    const key =  Reflect.ownKeys(rule)
    defineRule(key, rule[key]);
});



// defineRule('required', value => {
//     if (!value || !value.length) {
//         return 'This field is required';
//     }

//     return true;
// });

// defineRule('email', value => {
//     // Field is empty, should pass
//     if (!value || !value.length) {
//         return true;
//     }

//     // Check if email
//     if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
//         return 'This field must be a valid email';
//     }

//     return true;
// });

// defineRule('min', (value, [limit]) => {
//     // The field is empty so it should pass
//     if (!value || !value.length) {
//         return true;
//     }

//     if (value.length < limit) {
//         return `这个字段至少需要 ${limit} 字符`;
//     }

//     return true;
// });

// 全局消息生成器
// configure({
//     generateMessage: context => {
//         console.log('全局消息生成器')
//         return `这个字段 ${context.field} 不合法`;
//     },
// });

configure({
    // Generates an English message locale generator
    generateMessage: localize('cn', {
        messages: {
            required: '这个字段需要',
        },
    }),
});




// 导出验证规则
export { defineRule }