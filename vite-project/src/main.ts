import { createApp, createVNode, render, toRaw } from 'vue'
import App from './App.vue'
// import Card from './components/Card/index.vue'
import router from './router'
import LoadingBar from './components/Loading/LoadingBar.vue'

import { createPinia, PiniaPluginContext } from 'pinia'
const store = createPinia()
// 封装持久化插件
type Option = {
  key?: string
}
const __piniaKey__: string = 'pinia'
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const piniaPlugin = (options: Option) => (ctx: PiniaPluginContext) => {
  const { store } = ctx
  const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
  store.$subscribe(() => {
    setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state))
  })
  return {
    ...data
  }
}
store.use(piniaPlugin({ key: 'pinia' }))

// loading 进度条
const VNode = createVNode(LoadingBar)
render(VNode, document.body)

// 无需访问权限列表
const whiteList = ['/', '/login', '/news', '/user']
router.beforeEach((to, from, next) => {
  VNode.component?.exposed?.startLoading()
  // 权限控制
  if (whiteList.includes(to.path) || localStorage.getItem('token')) {
    document.title = to.meta.title
    next()
  } else {
    console.log(to.path)    
    next('/')
  }
})

router.afterEach(() => {
  VNode.component?.exposed?.endLoading()
})

// createApp(App).component('Card', Card).mount('#app')
createApp(App).use(store).use(router).mount('#app')
