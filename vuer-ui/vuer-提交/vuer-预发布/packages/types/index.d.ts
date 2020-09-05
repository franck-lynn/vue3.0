// 在package.json 文件中, 加上这句:
//  "types": "./types/index.d.ts",
// 让 types 文件与 js 的index.js 进行关联

export class VuerButton extends Vue {
    type: String;
    plain: Boolean;
    round: Boolean;
    circle: Boolean;
    icon: String;
    disabled: Boolean
}
interface item  {
    name: String;
    active: Boolean
}
export class VuerProgressBarStep extends Vue{
    items: Array<item>;
}




