import path from 'path'
// https://blog.csdn.net/hbiao68/article/details/108972775
const config = {
    optimizeDeps: {
        include: ['path', 'fs']
    },
    alias: {
        '/@/': path.resolve(__dirname, './src'), // 键必须以斜线开始和结束 
    }
}
export default config