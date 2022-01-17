import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: import(/* webpackChunkName: "login" */ '@/views/login/Login'),
    // 访问 login 之前
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: import(/* webpackChunkName: "register" */ '@/views/login/Register'),
    // 访问 login 之前
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/Shop')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '@/views/cartList/CartList')
  },
  {
    path: '/orderConfirm/:id',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "orderConfirm" */ '@/views/orderConfirm/OrderConfirm')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '@/views/orderList/OrderList')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 所有路由跳转之前
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register')
  if (isLogin || isLoginOrRegister) {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router
