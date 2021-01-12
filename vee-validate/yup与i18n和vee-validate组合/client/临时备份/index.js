// import { defineRule, configure } from "vee-validate";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
// import { required } from '@vee-validate/rules';
import { codes } from "./lang-codes";


(async () => {
    // code 是语言的简称, 例如: 在 locales.js 文件中定义的 zh_CN 就是 中文
    // json 的文件名称根据 这里定义的语言代码数组确定的
    const locales = await Promise.all(
        // 导入locales.js 文件中定义语言包的 json
        // codes.map((code) => import(`@vee-validate/i18n/dist/locale/${code}.json`))
        codes.map((code) => import(`../locales/${code}.json5`))
    );
    // 所有的语言包都放在 dict 字典对象中 
    const dictionary = locales.reduce((dict, curr, idx) => {
        // 当前语言包名称
        const code = codes[idx];
        // 当前语言包加入字段
        dict[code] = curr;
        return dict;
    }, {});

    configure({
        validateOnInput: true,
        generateMessage: localize(dictionary)
    });
    // setLocale("zh_CN");
})();

// defineRule('required', required)
// defineRule('required', value => {
//     if (!value || !value.length) {
//         return 'This field is required 这个字段需要输入';
//     }
//     return true;
// })

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
// })

// export { defineRule }