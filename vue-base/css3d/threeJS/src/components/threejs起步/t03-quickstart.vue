<template>

</template>

<script>
    import { defineComponent } from 'vue'
    // 引入 three 引擎需要的模块
    import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    export default defineComponent({
        name: 't03-quickstart',
        props: {},
        setup() {
            // https://www.bilibili.com/video/BV1RZ4y1s7Vr/?spm_id_from=333.788.videocard.12
            //! 三个东西, 场景, 相机, 渲染器
            //! 1. 创建一个场景
            const scene = new Scene()
            //! 2. 创建一个相机, 透视相机, 第1个参数, 视角, 宽高比, 第3个参数代表近面距离, 超出这个距离就看不到了 
            const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 1000)
            //! 3. 渲染器, 设置宽高
            const renderer = new WebGLRenderer({
                antialias: true // 去锯齿
            })
            renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器渲染区域
            //! 4. 把创造好的 canvas 添加到页面上
            document.body.appendChild(renderer.domElement)

            //! 5. 创建一个几何体
            const geometry = new BoxGeometry(50, 50, 50)
            //! 6. 创建几何体的材料
            const meterial = new MeshBasicMaterial({ color: 0x00ff00 })
            //! 7. 几何体和材料合体 --> 网格
            const cube = new Mesh(geometry, meterial)
            cube.rotation.x = 0.3
            cube.rotation.y = 0.5
            //! 8. 把网格放到场景中
            scene.add(cube)

            // 轨道控制器
            const controls = new OrbitControls(camera, renderer.domElement)


            //!! 9. 给相机设置一个位置
            camera.position.set(0, 20, 100)
            controls.update()
            //! 10. 渲染
            // renderer.render(scene, camera)

            function animate() {
                requestAnimationFrame(animate);
                // required if controls.enableDamping or controls.autoRotate are set to true
                controls.update();
                renderer.render(scene, camera);
            }
            animate()
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>