import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/Login"
import Register from "../views/Register"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/contcat',
    name: 'Contcat',
    component: ()=> import ("../views/Contcat.vue")
  },
  {
    path: '/news',
    name: 'News',
    component: ()=> import ("../views/News.vue")
  },
  {
    path: '/news_detail/:nid',
    name: 'NewsDetail',
    component: ()=> import ("../views/NewsDetail.vue")
  },
  {
    path: '/product_detail/:pid',
    name: 'ProductDetail',
    component: ()=> import ("../views/ProductDetail.vue")
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ()=> import ("../views/Cart.vue")
  },
  {
    // 开启路由传参
    // 读取时通过 props['type']
    props:true,
    path: '/product/:type',
    name: 'Product',
    component: ()=> import ("../views/Product.vue")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
