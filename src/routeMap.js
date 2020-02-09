import Login from '@/router/login/login';
import Home from '@/router/page/home';
import Goods from '@/router/page/goods';
import Setting from '@/router/page/setting/navagation'
import NotFound from "@/router/notfound";


const routes = [
    {pathname:'/', Redirect:'/home',exact:true},
    {pathname:'/home',  name: "首页", component: Home,auth:true,exact:true,path:'home'},
    {pathname:'/goods', Redirect:'/goods/list'},
    {pathname:'/setting', name:"设置",component: Setting},
    {pathname:'/goods', name: "商品", component: Goods,auth:true,exact:false,path:'goods',children:[
        {pathname:'/goods/list', name:'列表',path:'list'},
        {pathname:'/goods/detail', name:'详情',path:'detail'},
    ]},
    {pathname:'/login', name: "登录",path:'login', component: Login,routes:[],exact:true},
    {pathname:'*',name:'notfound',component:NotFound,routes:[],exact:true}
 ];

export default routes;

