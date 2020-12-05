// 已知坐标点 
const points = [
    { x: 10, y: 10 }, // 第1象限
    { x: -10, y: 10 },
    { x: -10, y: -10 },
    { x: 10, y: -10 },
    { x: 10, y: 0 },
    { x: -10, y: 0 },
    { x: 0, y: 0 }
]
// 求其与 x 轴的夹角

const betweenX = points.map(
    // 逆时针时角度为正
    pt => pt.y >= 0 ? Math.atan2(pt.y, pt.x) : 2 * Math.PI + Math.atan2(pt.y, pt.x)
)

console.log(betweenX.map(radian => radian * 180 / Math.PI))