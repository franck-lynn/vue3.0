const isCounterColckwise = (centerPoint, startPoint, e) => {
    let allA = 0;
    // 通过事件获取鼠标的结束点坐标, 起始点和中心点是已知的
    const endPoint = { x: e.pageX, y: e.pageY }
    const vectorCS = { x: startPoint.x - centerPoint.x, y: startPoint.y - centerPoint.y } // 中心点到起始点向量
    const vectorCE = { x: endPoint.x - centerPoint.x, y: endPoint.y - centerPoint.y } // 中心点到结束点的向量
    // 向量叉乘 得出是顺时针还是逆时针, 小于 0 是逆时针
    const direct = (vectorCS.x * vectorCE.y) - (vectorCS.y * vectorCE.x) // AB与AC叉乘求出逆时针还是顺时针旋转
    const lengthCS = Math.sqrt(Math.pow(centerPoint.x - startPoint.x, 2) +
            Math.pow(centerPoint.y - startPoint.y, 2)),
        lengthCE = Math.sqrt(Math.pow(centerPoint.x - endPoint.x, 2) +
            Math.pow(centerPoint.y - endPoint.y, 2)),
        lengthSE = Math.sqrt(Math.pow(startPoint.x - endPoint.x, 2) +
            Math.pow(startPoint.y - endPoint.y, 2));
    const cosA = (Math.pow(lengthCS, 2) + Math.pow(lengthCE, 2) - Math.pow(lengthSE, 2)) /
        (2 * lengthCS * lengthCE); //   余弦定理求出旋转角
    const angleA = Math.round(Math.acos(cosA) * 180 / Math.PI);
    if (direct < 0) { // 叉乘结果为负表示逆时针旋转， 逆时针旋转减度数
        allA -= angleA
        console.log(`逆时针转了 ${allA} 度`)
    } else {
        allA += angleA
        console.log(`顺时针转了 ${allA} 度`)
    }
    // 终点变起点, 作为下次的起点
    startPoint = endPoint
}