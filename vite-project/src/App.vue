<template>
  <div class="scroll__wrapper"></div>
  <LoadingBar />
  <div>
    <router-link to="/">Home</router-link>
    <!-- replace 不保留历史记录 -->
    <router-link replace to="/login">Login</router-link>
    <router-link :to="{ name: 'User' }">User</router-link>
    <router-link to="/news">News</router-link>
  </div>
  <button @click="pathToPage('/login')"> Nav to login</button>
  <button @click="nameToPage('User')"> Nav to User</button>
  <button @click="toPage('Cart')"> Nav to Cart</button>
  <hr />
  <button @click="prev()">Prev Page</button>
  <button @click="next()">Next Page</button>

  <router-view #default="{ route, Component }">
    <transition
      :duration="1000"
      :enter-active-class="`animate__animated ${route.meta.transition?.enter}`"
      :leave-active-class="`animate__animated ${route.meta.transition?.leave}`"
    >
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LoadingBar from './components/Loading/LoadingBar.vue';
import 'animate.css'

const router = useRouter()
const pathToPage = (url: string) => {
  // router.push(url)
  router.push({
    path: url,
    query: {
      id: '123'
    }
  })

  // 不保留历史记录
  // router.replace({
  //   path: url
  // })
}
const nameToPage = (url: string) => {
  router.push({
    name: url,
    // params 必须使用 router name 传参
    params: {
      username: 'tang'
    }
  })
}

const toPage = (url: string) => {
  router.push({
    name: url,
    // params 必须使用 router name 传参
    // 参数存于内存，刷新丢失
    // 使用动态路由参数解决 path: '/user/:username'
    params: {
      id: 'tang_id'
    }
  })
}

const prev = () => {
  router.back()
}

const next = () => {
  // router.go(-1)
  router.go(1)
}

</script>

<style scoped>
a {
  margin-left: 20px;
}
button {
  margin-top: 20px;
  margin-right: 10px;
}
.scroll__wrapper {
  height: 1000px;
  background-color: rgba(0, 0, 0, .4);
}
</style>
