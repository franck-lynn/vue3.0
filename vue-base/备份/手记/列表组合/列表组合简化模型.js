

// const curves = [
//     [{ x: 1, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }],
//     [{ x: 3, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 4 }],
//     [{ x: 5, y: 6 }, { x: 5, y: 6 }, { x: 5, y: 6 }],
//     [{ x: 7, y: 8 }, { x: 7, y: 8 }, { x: 7, y: 8 }],
// ]
/*
需要得到的结构:
[
    [{ x: 1, y: 2 }, , { x: 3, y: 4 }, { x: 5, y: 6 }, { x: 7, y: 8 }],
    [{ x: 1, y: 2 }, , { x: 3, y: 4 }, { x: 5, y: 6 }, { x: 7, y: 8 }],
    [{ x: 1, y: 2 }, , { x: 3, y: 4 }, { x: 5, y: 6 }, { x: 7, y: 8 }],
]
*/
/*
[
    [{ x: 1, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 2 }],
    [{ x: 3, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 4 }],
    [{ x: 5, y: 6 }, { x: 5, y: 6 }, { x: 5, y: 6 }],
    [{ x: 7, y: 8 }, { x: 7, y: 8 }, { x: 7, y: 8 }],
]
*/
const curves = [
    [1, 2, 3], 
    [1, 2, 3], 
    [1, 2, 3], 
]
 var newArray = curves[0].map(function(col, i) {
     // 外圈执行第1列时, 内圈执行每一行的第1列返回 
     return curves.map(function(row) {
         // curves 有3行, 
         // 第1行: [1, 2, 3], 返回 1
         // 第2行: [1, 2, 3], 返回 1
         // 第3行: [1, 2, 3], 返回 1
         return row[i];
     })
 });
 const convertCurves = curves => curves[0].map((_, i) => curves.map(row => row[i]))
 
 console.log(convertCurves(curves))
 
console.log(
    newArray
)