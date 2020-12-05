<template>

</template>

<script>
    import { defineComponent } from 'vue'
    // 引入 three 引擎
    import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
    export default defineComponent({
        name: 't01-scene-3d',
        props: {},
        setup() {
            // 创建场景对象
            const scene = new Scene()
            // 创建一个相机
            const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            // 渲染器
            const renderer = new WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            var geometry = new BoxGeometry();
            var material = new MeshBasicMaterial({ color: 0x00ff00 });
            var cube = new Mesh(geometry, material);
            scene.add(cube);

            camera.position.z = 5;

            function animate() {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>