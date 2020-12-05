<template>
    <h1><a href="http://jsonplaceholder.typicode.com/">jsonplaceholder 网站</a></h1>
    <div class="root"></div>

</template>

<script>
    import { defineComponent, onMounted } from 'vue'
    export default defineComponent({
        name: 'jsonplaceholder',
        props: {},
        setup() {


            onMounted(() => {
                const getData = async () => {
                    // 获取远程的响应, 是一个数据流, 也是异步的
                    // const response = await fetch("http://jsonplaceholder.typicode.com/posts")
                    const response = await fetch("/posts")
                    // 流 转成 json, 也是异步的
                    const posts = await response.json()
                    console.log(posts)
                    const root = document.querySelector('.root')
                    const ul = document.createElement('ul')
                    posts.forEach(post => {
                        const li = document.createElement('li')
                        const anchor = document.createElement('a')
                        anchor.appendChild(document.createTextNode(post.title))
                        anchor.setAttribute('href', `posts/${post.id}`)
                        li.append(anchor)
                        ul.appendChild(li)
                    })
                    root.append(ul)
                }
                getData()

            })

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>