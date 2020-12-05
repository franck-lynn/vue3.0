

import R from "ramda"

const centerArcDimension = [
    {
        operator: 'M',
        x: 200,
        y: 200
    },
    { operator: 'L', x: 120, y: 73.114 },
    {
        operator: 'A',
        // 直接绘出在中心点的圆弧
        startPoint: { x: 120, y: 73.114 },
        r: 150,
        xAxisRoatation: 0,
        largeArcFlag: 0, // 取小弧
        sweepFlag: 1, // 顺时针
        endPoint: { x: 280, y: 73.114 }
    },
    {
        operator: 'L',
        x: 200,
        y: 200
    },
]
// 关注 数组中的第2个中的 endPoint 里的x属性

const endPoint = R.lensPath([2, 'endPoint'])
// // 查看关注的属性
// const x = R.view(endPointX, centerArcDimension)
// 设置关注点的值
const result = R.set(endPoint, {x: "新的值x", y: "新的值y"}, centerArcDimension)
console.log(result)