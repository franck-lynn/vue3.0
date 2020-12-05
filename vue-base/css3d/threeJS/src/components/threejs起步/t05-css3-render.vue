<template>

</template>

<script>
    import { defineComponent } from 'vue'
    import { PerspectiveCamera, Scene } from 'three'
    import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer"
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    export default defineComponent({
        name: 't05-css3-render',
        props: {},
        setup() {
            // https://blog.csdn.net/weixin_34007020/article/details/91371887
            // https://threejs.org/examples/#css3d_orthographic
            // vue 实现 css 3d, 场, 相, 染
            const scene = new Scene()
            const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
            camera.position.set(0, 20, 100) // 相机位置


            
            
            const root = document.createElement('div') // 使用 js 动态创建 DomElement
            root.className = 'container'
            root.style.backgroundColor = "red"
            root.style.width = 60+'px'
            root.style.height = 50+'px'
            root.innerHTML = "标签"
            
            //? 渲染器的环境, 相当于画布
            const rootObject = new CSS3DObject(root)
            scene.add(rootObject)
            

            // 定义css3 渲染器
            const renderer = new CSS3DRenderer(rootObject)


            renderer.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(renderer.domElement)


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
    div {
        background-color: #ff0000;
    }
</style>