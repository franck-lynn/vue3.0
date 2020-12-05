import path from 'path'
const config = {
    optimizeDeps: {
        include: ['path']
    },
    alias: {
        '/@/': path.resolve(__dirname, './src'), // 键必须以斜线开始和结束 
    }
}

export default config