const fail = thing => { throw new Error(thing) }
const warn = thing => { console.log(["Warning: ", thing].join(' ')) }
const note = thing => { console.log(["Note: ", thing].join(' ')) }

const getLeftArr = (arr) => { // 先左查, 再右查
    // 左查, 查找为假的数字前一个为真的数字在数组中的位置, 这个数字后面有一个假
    let arrLeft = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            if (!arr[i + 1] && i !== arr.length - 1) {
                arrLeft.push(i)
            }
            // 如果是最后一个
            if (i === arr.length - 1) {
                if (!arr[i] && arr[0]) { // 最后一个为 false, 且第0个为false 才放进数组, 否则什么都不做
                    arrLeft.push(i)
                }
            }
        }else{
            // 当前循环到的是 false 情况也需要讨论下
            if(!arr[0]){
                arrLeft.push(0)
            }
        }
    }
    return arrLeft
}

const getRightArr = (arr) => {
    let arrRight = []
    for (let i = arr.length - 1; i >= 0; i--) {
        if (!arr[i]) {
            if (arr[i - 1]) {
                arrRight.unshift(i)
            }
            if (i === 0) {
                arrRight.unshift(i)
            }
        }
    }
    // 切掉最后一块数组并补上切点后的数组就把最后一个调到前面了
    // arrRight = arrRight.splice(-1).concat(arrRight)
    return arrRight
}
export { fail, warn, note, getLeftArr, getRightArr }