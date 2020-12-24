<template>
    <div id="remote">
        <input class="typeahead" type="text" placeholder="请输入型号">
    </div>
</template>

<script>
    // 从本地预拿数据
    import Bloodhound from 'corejs-typeahead/dist/bloodhound';
    // 实际上是用到的, 是 $('#the-basics .typeahead').typeahead 的依赖
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import typeahead from 'corejs-typeahead/dist/typeahead.jquery';

    import { defineComponent, nextTick } from 'vue'
    export default defineComponent({
        name: 'prefetch-from-local',
        props: {},
        setup() {
            // 定义寻血猎狗对象
            const catalogNumber = new Bloodhound({
                // 从数据的catalog_number列中查找
                // 需要清理之前的数据
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('catalog_number'),
                // 查询口令
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                // 从本地拿数据并缓存起来,如果从远程获取的话每次都会检索一次数据库
                prefetch: {
                    url: '/data/products.json', 
                    // 在webpack 里设置请求转发, 这里不需要 http://localhost:3000/data/products.json
                    // 否则, 就会有跨域问题
                    // transform: function(data) {
                    //     // 如果数据返回在 body, 则需要 transform 转化一下, 用 server-router 在另外文件测试一下
                    //     console.log("直接拿到了数据, 这里并没有执行", data);
                    //     return data;
                    // }
                }
            });
            nextTick(() => {
                // 设置显示
                $('#remote .typeahead').typeahead(null, {
                    name: 'catalog_number', // 设置生成的元素的class属性

                    display: 'catalog_number', // 显示的型号列
                    // display: function(item){
                    // console.log(item);
                    // return item['catalog_number']
                    // },
                    source: catalogNumber.ttAdapter()
                });
            })
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>