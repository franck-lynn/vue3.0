import { multiply } from 'mathjs'
import { evolve, has, isEmpty, pluck, mergeRight, zipObj } from 'ramda'
import { ref, onUnmounted } from 'vue';
import { rotationMoveMatrix } from "./matrices"
import { singlePin } from "./make-poliline-path"
import { createArcByAngleAndCenter } from "./make-path"


const rotateMovePoint = (curvePoints, rotationAndMovePoint, rotationAngle) => {
    const T = rotationMoveMatrix(rotationAndMovePoint, rotationAngle)
    const rotationPointMoveFn = (pt) => {
        return zipObj(['x', 'y'], multiply([pt.x, pt.y, 1], T))
    }
    const transformations = {
        // 有就会运行, 没有就不会运行
        startPoint: rotationPointMoveFn,
        centerPoint: rotationPointMoveFn,
        endPoint: rotationPointMoveFn
    }
    let root = {}
    // 如果对象的根部有 x, y 属性, 就转化这个坐标, 没有就跳过
    if (has('x', curvePoints) && has('y', curvePoints)) {
        root = mergeRight(curvePoints, rotationPointMoveFn(curvePoints))
    }
    // 如果 root 为 空, 就要用原来的对象
    root = isEmpty(root) ? curvePoints : root
    const result = evolve(transformations, root)
    return result
}
const rotateMovePoints = (points, rotationAndMovePoint, rotationAngle) => {
    return points.map(point => rotateMovePoint(point, rotationAndMovePoint, rotationAngle))
}

const usePins = (node, points, colorPins, centerPoint, angles, pinIdPrefix) => {
    // const colorPin = ref()
    const dynamicAngle = ref()
    const startAngle = ref()
    // 监听鼠标事件, 根据鼠标位置画出圆弧
    const currentTarget = ref('') // 当前表针
    // const indexAngle = ref(0) // 分度角
    // const actives = ref([])
    // const leftSequence = ref([]) // 左序列保存的是激活的为真最后一个且后一个为假的序列
    // const rightSequence = ref([]) // 右序列保存的是未激活第1个

    // actives.value = pluck('active')(data)
    // leftSequence.value = getLeftArr(actives.value)
    // const dataLength = data.length
    // indexAngle.value = 2 * Math.PI / dataLength // 分度角

    node.value.addEventListener('mousedown', onRotate)
    node.value.addEventListener('mouseup', stopRotate)

    onUnmounted(() => {
        node.value.removeEventListener('mousedown', onRotate)
        node.value.removeEventListener('mouseup', stopRotate)
    })

    function onRotate(e) {
        currentTarget.value = e.target.id
        // 鼠标点击一下, 获取当前的 表针
        node.value.addEventListener('mousemove', startRotate)
    }

    function stopRotate() {
        node.value.removeEventListener('mousemove', startRotate)
        // 每个表针还回到原来的位置, 只是假的移动
        for (let i = 0; i < colorPins.value.length; i++) {
            if (currentTarget.value === `${pinIdPrefix}-${i}`) {
                colorPins.value[i] = singlePin(points, centerPoint, angles.value[i])
                startAngle.value = angles.value[i]
                dynamicAngle.value = angles.value[i]
            }
        }
        // // 每个激活的数字都画一个圆弧, 还是和初始化一样的角度
        // for (let i = 0; i < colorPins.value.length; i++) {
        //     if (currentTarget.value === `watchhand-${i}`) {
        //         // 清除圆弧
        //         dynamicAngle.value = false
        //     }
        // }
    }

    function startRotate(e) {
        if (!currentTarget.value) return
        const x = e.pageX - centerPoint.x // 鼠标点平移到了圆心, 有正有负
        const y = e.pageY - centerPoint.y
        const atanA = Math.atan2(y, x)

        for (let i = 0; i < colorPins.value.length; i++) {
            if (currentTarget.value === `${pinIdPrefix}-${i}`) {
                // console.log("当前的角度", angles.value[i])
                
                // colorPins.value[i] = singlePin(points, atanA + Math.PI / 2)
                // 对起始点在 y轴正向的观念来讲, 这个鼠标点还需要处理一下才能达到预期
                // TODO: 起始角按照未激活的前一个, 作为开始计算, 而不是 左序列进行计算
                // let startAngle = (leftSequence.value[i]) * indexAngle.value // 起始角已经 加了 Math.PI / 2, drawArc() 函数里做的
                // // console.log("第几个?", rightSequence.value[i])
               startAngle.value = angles.value[i]

                let endAngle = atanA + Math.PI / 2
                // 如果是顺时针转动. 必须要 endAngle > startAngle
                // if (endAngle < startAngle) {
                //     endAngle = endAngle + 2 * Math.PI
                // }
                // dynamicAngle.value = drawArc(cx, cy, arcRadius, startAngle, endAngle)
              
                colorPins.value[i] = singlePin(points, centerPoint, atanA + Math.PI / 2)
                dynamicAngle.value = endAngle
                // console.log("动态角度值: ", dynamicAngle.value)
            }
        }
    }
    return {startAngle, dynamicAngle}

}


const createArcs = (centerPoint, r, arr) => {
    const isPending = ref([])
    const angles = ref([])
    const indexAngle = 2 * Math.PI / arr.length // 分度角
    // 通过 数组对象提取里面的active 属性
    const actives = pluck('active')(arr)
    for (let i = 0; i < actives.length; i++) {
        if (actives[i]) {
            // 这里增加 2个 状态, 分别表示 已经完成了的事情 和正在待处理的事情
            // 如过为真, 并且下一个也为真 就是完成状态, 如果为真, 但是下一个为假, 就是待处理状态的圆弧
            if (actives[i + 1]) {
                isPending.value.push(false) // 待处理为假, 说明已经处理了
            } else {
                // 如果是最后一个, 则判断第1个
                if(i ===actives.length-1){
                    if(actives[0]){
                        isPending.value.push(false)
                    }
                }
                isPending.value.push(true)
            }
            angles.value.push(createArcByAngleAndCenter(centerPoint, r, i * indexAngle, (i + 1) * indexAngle))
        }
    }
    return { isPending, angles }
}

/* 
const drawArcs = (cx, cy, R, arr) => {

    const isPending = ref([])
    const angles = ref([])

    const indexAngle = 2 * Math.PI / arr.length // 分度角
    // 通过 数组对象提取里面的active 属性
    const actives = pluck('active')(arr)

    for (let i = 0; i < actives.length; i++) {
        if (actives[i]) {
            // 这里增加 2个 状态, 分别表示 已经完成了的事情 和正在待处理的事情
            // 如过为真, 并且下一个也为真 就是完成状态, 如果为真, 但是下一个为假, 就是待处理状态的圆弧
            if (actives[i + 1]) {
                isPending.value.push(false) // 待处理为假, 说明已经处理了
            } else {
                isPending.value.push(true)
            }
            angles.value.push(drawArc(cx, cy, R, i * indexAngle, (i + 1) * indexAngle))
        }
    }
    return { isPending, angles }
}
 */


export {
    rotateMovePoints,
    usePins,
    createArcs
}