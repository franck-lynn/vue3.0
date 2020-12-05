<template>

</template>

<script>
    import { defineComponent } from 'vue'
    import {  BufferGeometry, Line, LineBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    export default defineComponent({
        name: 't04-drawing-lines',
        props: {},
        setup() {
            const scene = new Scene()
            const camera = new PerspectiveCamera(45, window.innerWidth / window.innerWidth, 0.1, 1000)
            const renderer = new WebGLRenderer({ antialias: true })
            renderer.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(renderer.domElement)
            camera.position.set(0, 0, 100)
            camera.lookAt(0, 0, 0)

            // 定义线的材质
            const material = new LineBasicMaterial({ color: 0x00ff00 })
            var points = [];
            points.push(new Vector3(-10, 0, 0));
            points.push(new Vector3(0, 10, 0));
            points.push(new Vector3(10, 0, 0));
            var geometry = new BufferGeometry().setFromPoints(points);

            var line = new Line(geometry, material);

            scene.add(line);
            camera.position.set(0, 20, 100)
            // 轨道控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            // renderer.render(scene, camera)
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