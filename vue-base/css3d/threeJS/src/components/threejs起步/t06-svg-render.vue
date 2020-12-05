<template>

</template>

<script>
    import { defineComponent } from 'vue'
    import { LineBasicMaterial, Float32BufferAttribute, PerspectiveCamera, Scene, BufferGeometry, Line } from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { SVGRenderer } from "three/examples/jsm/renderers/SVGRenderer"
    export default defineComponent({
        name: 't06-svg-render',
        props: {},
        setup() {
            // svg 渲染
            const scene = new Scene()
            const camera = new PerspectiveCamera(33, window.innerWidth / window.innerHeight, 0.1, 100)
            camera.position.z = 10
            const renderer = new SVGRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            const vectors = []
            const divisions = 50
            for (let i = 0; i < divisions; i++) {
                const v = (i / divisions) * Math.PI * 2 // 分度角
                const x = Math.sin(v)
                const z = Math.cos(v)
                vectors.push(x, 0, z)
            }
            const geometry = new BufferGeometry()
            geometry.setAttribute('position', new Float32BufferAttribute(vectors, 3))
            

            for (let i = 1; i <= 3; i++) {
                const material = new LineBasicMaterial({
                    color: Math.random() * 0xffffff,
                    linewidth: 10
                })
                const line = new Line(geometry, material)
                line.scale.setScalar(i / 3);
                scene.add(line);
            }
            
            // 画布尺寸变化时重新设置画布
            window.addEventListener('resize', onWindowResize, false);

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);

            }

            // 轨道控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.update()

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