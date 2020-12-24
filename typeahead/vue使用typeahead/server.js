// 一个简单的提供静态 json 数据服务的服务器
import Koa from 'koa'
// import path from 'path'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'

const app = new Koa();
app.use(bodyParser());
app.use(koaStatic(__dirname));

app.listen(3000, () => {
    console.log('services is running at http://localhost:3000/data/films/post_1960.json');
    console.log('services is running at http://localhost:3000/data/products.json');
    console.log('services is running at http://localhost:3000/Default-Suggestions.html');
    console.log('services is running at http://localhost:3000/multiple-datasets.html');
    console.log('services is running at http://localhost:3000/Scrollable-Dropdown-Menu.html');
});