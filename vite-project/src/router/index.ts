import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    transition?: object
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../components/Nav/index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        meta: {
          title: 'Home Page',
          // 子路由只生效一次？
          transition: {
            enter: 'animate__fadeIn',
            leave: 'animate__slideOutUp'
          }
        },
        component: () => import('../pages/Home.vue')
      },
      {
        path: '/login',
        name: 'Login',
        meta: {
          title: 'Login Page'
        },
        component: () => import('../pages/Login.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          title: 'User Page'
        },
        component: () => import('../pages/User.vue')
      },
      {
        path: '/cart/:id',
        name: 'Cart',
        component: () => import('../pages/Cart.vue')
      }
    ]
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      title: 'News Page',
      transition: {
        enter: 'animate__slideInLeft',
        leave: 'animate__slideOutUp'
      }
    },
    component: () => import('../pages/News.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savePosition) => {
    // 自动记录滚动条距离
    // console.log(savePosition);
    return savePosition || { top: 0 }
    // return { top: 300 }

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({ top: 300 })
    //   }, 2000);
    // })
  },
  routes
})

export default router