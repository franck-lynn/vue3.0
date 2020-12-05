<template>

</template>

<script>
    import { defineComponent } from 'vue'
    import { Color, MeshBasicMaterial, PerspectiveCamera, Scene, BoxBufferGeometry, Mesh } from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    import { SVGRenderer } from "three/examples/jsm/renderers/SVGRenderer"
    export default defineComponent({
        name: 'svg-cube',
        props: {},
        setup() {
            // svg 渲染
            const scene = new Scene()
            scene.background = new Color(0xf0f0f0);
            const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 10

            // cubes
            const cube = new BoxBufferGeometry(100, 100, 100);

            let mesh = new Mesh(cube, new MeshBasicMaterial({ color: 0x0000ff, opacity: 0.5, transparent: true }));
            mesh.position.x = 100;
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
            scene.add(mesh);
            // CYLINDER
            // mesh = new Mesh(new CylinderBufferGeometry(20, 100, 200, 10), new MeshBasicMaterial({ color: Math.random() * 0xffffff }));
            // mesh.position.y = 180;
            // mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
            // scene.add(mesh);

            // CUSTOM
            // var node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            // node.setAttribute('stroke', 'black');
            // node.setAttribute('fill', 'red');
            // node.setAttribute('r', '40');

            // for (var i = 0; i < 50; i++) {

            //     var object = new SVGObject(node.cloneNode());
            //     object.position.x = Math.random() * 1000 - 500;
            //     object.position.y = Math.random() * 1000 - 500;
            //     object.position.z = Math.random() * 1000 - 500;
            //     scene.add(object);

            // }








            const renderer = new SVGRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setQuality('low');

            document.body.appendChild(renderer.domElement);

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
    svg {
        display: block;
    }
</style>