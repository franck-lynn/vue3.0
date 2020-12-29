// For demo purposes we are adding all locales, you SHOULD NOT DO THIS IN PRODUCTION
import { configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import { codes } from "./lang-codes";

(async () => {
    // code 是语言的简称, 例如: 再 locales.js 文件中定义的 zh_CN 就是 中文
    // json 的文件名称根据 这里定义的语言代码数组确定的
    const locales = await Promise.all(
        codes.map((code) => import(`@vee-validate/i18n/dist/locale/${code}.json`))
    );

    const dictionary = locales.reduce((dict, curr, idx) => {
        const code = codes[idx];
        dict[code] = curr;

        return dict;
    }, {});

    configure({
        generateMessage: localize(dictionary)
    });

    setLocale("cn");
})();