<template>
    <div class="box">
        <div class="up">上</div>
        <div class="down">下</div>
        <div class="left">左</div>
        <div class="right">右</div>
        <div class="forward">前</div>
        <div class="back">后</div>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted } from 'vue'
    import Quaternion from "./quaternion";
    export default defineComponent({
        name: 'perspective',
        props: {},
        setup() {
            const useRotate = () => {
                // const xAngle = ref()
                
                // 记录当前的鼠标位置
                const startX = ref()
                const startY = ref()
                onMounted(() => {
                    // 获取父元素
                    const box = document.querySelector('.box')
                    // let transform = getComputedStyle(box).transform
                    // 监听鼠标中键按下的事件
                    box.addEventListener('mousedown', startRotation)
                })

                function startRotation(e) {
                    //  判断是不是鼠标中键.
                    if(e.button === 1){ // 如果是鼠标中键, 则监听移动事件
                        // 保存当前的鼠标位置
                        startX.value = e.clientX
                        startY.value = e.clientY
                        
                        document.documentElement.addEventListener('mousemove', onRotation)
                        // 鼠标松开是 触发 停止转动事件
                        document.documentElement.addEventListener('mouseup', stopRotation)
                    }
                }
                function onRotation(e) {
                    // https://zoyi14.smartapps.cn/pages/note/index?slug=671e73ff4ba0&origin=share&hostname=baiduboxapp&_swebfr=1
                    let yaw = 0
                    let pitch = 0
                    // 如何动态的求出这些角度?, 如何判断鼠标是绕哪个轴旋转, 绕的是屏幕观察者的坐标系,在变换到 物体的坐标系 
                    let xOffset = e.clientX - startX.value
                    let yOffset = e.clientY - startY.value
                    
                    // startX.value =e.clientX
                    // startY.value = e.clientY
                    // 灵敏度
                    let sensitivity = 0.4
                    xOffset *= sensitivity
                    yOffset *= sensitivity
                    
                    yaw += xOffset
                    pitch += yOffset
                    // const x = e.clientX
                    // const y = e.clientY
                    // const atanA = Math.atan2(y-startY.value, x - startX.value) * 180 / Math.PI
                    const rad = Math.PI / 180;
                    // const q = Quaternion.fromEuler(ev.alpha * rad, ev.beta * rad, ev.gamma * rad, 'ZXY')
                    const q = Quaternion.fromEuler(yaw * rad, pitch * rad, 1 * rad, 'ZXY')
                    // const q = new Quaternion()
                    console.log("四元数---> ", q)
                    document.querySelector('.box').style.transform = "matrix3d(" + q.conjugate().toMatrix4() + ")";
                    
                }
                function stopRotation() {
                    // 清除 onRotation 事件, 清除 stopRotation 事件
                     document.documentElement.removeEventListener('mousemove', onRotation)
                     document.documentElement.removeEventListener('mouseup', stopRotation)
                     
                }
            }
            useRotate()
            return {}
        }
    })
</script>

<style lang="scss" scoped>
    .box {
        width: 300px;
        height: 300px;
        border: 1px solid rgb(238, 18, 18);
        margin: 150px auto; // 居中
        position: relative;
        transform-style: preserve-3d; // 父盒子添加3d属性, 可以让内部的子元素保持 3d 效果
        // 辅助样式
        transform: rotateX(40deg) rotateY(-31deg);
        // transition: transform 6s;

        // &:hover{
        //     transform: rotateX(360deg) rotateY(360deg);
        // }
        div {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            text-align: center; // 居中
            line-height: 300px;
            font-size: 150px;

            &.left {
                background-color: red;
                transform: translateX(-150px) rotateY(90deg); // 向左移动
            }

            &.right {
                background-color: blue;
                transform: translateX(150px) rotateY(90deg); // 向左移动
            }

            &.forward {
                // width: 150px;
                background-color: #daa520;
                transform: translateZ(150px);
            }

            &.back {
                background-color: hotpink;
                transform: translateZ(-150px);
            }

            &.up {
                background-color: purple;
                transform: translateY(-150px) rotateX(90deg);
            }

            &.down {
                background-color: green;
                transform: translateY(150px) rotateX(90deg);
            }
        }
    }
</style>