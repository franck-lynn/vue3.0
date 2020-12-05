const arcDemensions = {
    operator: 'A',
    startPoint: { x: 229.71, y: 42.783 },
    centerPoint: { x: 200, y: 200 },
    r: 160,
    endPoint: { x: 344.204, y: 130.38 }
    // 已知圆弧半径, 中心点坐标, 起始角, 结束角, 求起始点, 结束点坐标
}

const d = {
    startPoint: { x: 2, y: 4 },
    r: 2,
    endPoint: { x: 4, y: 2 }
}


const createArc = (d) => {
    // 参数: 起始点, 半径, 结束点, 
    // 需要根据这些参数计算 是哪一部分的弧
    // d 有3个参数, 起始点, 半径, 终止点. 根据这 3 个参数判断是 大弧还是小弧, 是不是交换位
    // 求圆心坐标
    const c1 = (Math.pow(d.endPoint.x, 2) - Math.pow(d.startPoint.x, 2) +
            Math.pow(d.endPoint.y, 2) - Math.pow(d.startPoint.y, 2)) /
        (2 * (d.endPoint.x - d.startPoint.x))

    const c2 = (d.endPoint.y - d.startPoint.y) / (d.endPoint.x - d.startPoint.x)

    const A = 1 + Math.pow(c2, 2)

    const B = 2 * (d.startPoint.x - c1) * c2 - 2 * d.startPoint.y
    const C = Math.pow((d.startPoint.x - c1), 2) + Math.pow(d.startPoint.y, 2) - Math.pow(d.r, 2)

    const y01 = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A)
    const x01 = c1 - c2 * y01
    console.log("第1组解---> ", { x01, y01 })
    const y02 = (-B - Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A)
    const x02 = c1 - c2 * y02
    console.log("第2组解---> ", { x02, y02 })
}
createArc(d)
createArc(arcDemensions)


/*
已知: 圆弧的起始点和结束点的坐标, sPoint: {x: ..., y: ...}, ePoint: {x: ..., y: ...}
      圆弧的半径 r, 
      1). 求圆心的坐标, 有2个圆心, 我想要其中的一个, 怎么判断?
      2). 确定其中一个圆后, 当起始点和结束点在不同位置时, 有优弧和劣弧之分, 
          我想结束点按照顺时针走的时候能形成一个整圆, 或者逆时针也能更好.
          顺时针或者逆时针按照起始点结束点坐标位置判断
          只能在确定的一个圆上, 解不能跑到另外一个圆上
     
*/