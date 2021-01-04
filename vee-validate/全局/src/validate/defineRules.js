import { defineRule } from 'vee-validate'
import { reuqired, email, minLength } from './rules'
defineRule('required', reuqired)
defineRule('email', email)
// defineRule('password', minLength)
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

defineRule('min', (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
        return true;
    }

    if (value.length < limit) {
        return `这个字段至少需要 ${limit} 字符`;
    }

    return true;
});
// 导出验证规则
export { defineRule }