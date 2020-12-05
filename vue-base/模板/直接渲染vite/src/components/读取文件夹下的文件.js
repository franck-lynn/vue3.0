import fs from 'fs'
import path from 'path'
// 同步方式过滤 .vue 文件
const walk = (dir) => {
    let results = []
    const files = fs.readdirSync(dir)
    files.forEach((file)=> {
        file = dir + path.sep + file
        const stat = fs.statSync(file)
        if(stat && stat.isDirectory()){
            results = results.concat(walk(file))
        }else{
            if(path.extname(file) === '.vue'){
                results.push(file)
            }
        }
    })
    return results
}

const f = walk(__dirname)
console.log(f)
