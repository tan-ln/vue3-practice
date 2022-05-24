import { createApp, createVNode, render } from 'vue'
import App from './App.vue'
// import Card from './components/Card/index.vue'
import router from './router'
import LoadingBar from './components/Loading/LoadingBar.vue'

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
createApp(App).use(router).mount('#app')
