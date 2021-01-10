// 这个 fs webpack 识别不了
import fs from 'fs'
import path from 'path'

const readfiles = (dir, ignore = null, list = [], deep = 0) => {
    const files = fs.readdirSync(dir, 'utf-8')

    for (let i = 0; i < files.length; i++) {
        const stat = fs.statSync(dir + path.sep + files[i])
        if (stat.isDirectory()) {

            readfiles(dir + path.sep + files[i], ignore, list, deep + 1)
        } else {
            // 忽略掉第1层的要忽略的文件, 如不需要这个功能, 去掉 deep 即可
            // 数组, 字符串忽略都可以
            if (!deep && ignore && ignore.indexOf(files[i]) !== -1) continue
            list.push(dir + path.sep + files[i])
        }
    }
    return list
}

export { readfiles }