vue3.0 封装的组件
================
### 1. 前面已经搭建好了 骨架, 在这个基础上
     src
     | --- components // 组件目录
     |     | ---button // 每个组件以单独的文件夹呈现
     |     |    | --- button.vue // button组件的封装
     |     | ---checkbox 
     |     |    | --- checkbox.vue 
     |     |    | --- checkbox-group.vue 
     | --- router
     |     | --- index.js // 路由文件
     | --- scss // 样式文件夹
     |     | --- _global.variable.scss
     |     | --- main.scss
     | --- views // 测试文件夹
     |     | --- test-xxx.js
     | --- App.vue // vue 总入口文件
     | --- main.js // 前端总入口文件

### 2. 注意的要点
#### 2.1. dialog.vue 中 button的 click事件发射的要在test使用时加一个监听
```
const handleClose = () => {
    // console.log("触发")
    // ctx.emit('close', false)
    ctx.emit('update:visible', false)
}
// test-dialogvue中加的监听
<vuer-dialog width="80%" top="100px" v-model:visible="visible">
```

















    