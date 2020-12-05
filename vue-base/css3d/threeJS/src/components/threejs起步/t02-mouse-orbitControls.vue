<template>
    <!-- 鼠标控制3d, 在 three 官方文档 example 下的 control文件-->
</template>

<script>
    import { defineComponent } from 'vue'
    // 引入 three 引擎
    import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    export default defineComponent({
        name: 't02-mouse-orbitControls',
        props: {},
        setup() {
            var renderer = new WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(renderer.domElement);
            
            // 创建场景对象
            const scene = new Scene()
            var geometry = new BoxGeometry()
            var material = new MeshBasicMaterial({ color: 0x00ff00 })
            var cube = new Mesh(geometry, material);
            scene.add(cube);
            // 创建一个相机
            const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
            // 轨道控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            //controls.update() must be called after any manual changes to the camera's transform
            camera.position.set(0, 20, 100);
            controls.update();

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