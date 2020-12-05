// https://zhuanlan.zhihu.com/p/59564277
// https://zhuanlan.zhihu.com/p/75248730
// 读取 index.js 所在文件夹的 js 文件
const files = require.context('./', true, /\.js$/)

for (const key of files.keys()) {
    if (key === './index.js') continue
    // 实现动态导出文件, 不用一个一个的输入再导出了
    // 利用 node 的 module 动态导出模块的命令
    for (const m in files(key)) {
        exports[m]= files(key)[m]
    }
}
