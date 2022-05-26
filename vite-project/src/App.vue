<template>
  <div>
    <h1>Test</h1>
    <h2>{{ Auth.a }}</h2>
    <button @click="Auth.a++">方法一：count ++</button>
    <button @click="handleClick">方法二：count ++</button>
    <button @click="handleClick5">方法五：count ++</button>
    <button @click="Auth.$reset()">reset 恢复原始值</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './store'
const Auth = useAuthStore()

const handleClick = () => {
  // 支持批量修改
  Auth.$patch({
    a: 123
  })
  // 3. 函数，可以进行业务逻辑的书写
  // Auth.$patch((state) => {
  //  if (1) {
  //    state.a = 500
  //  }
  // })
  // 4. 直接覆盖整个对象
  // Auth.$state = {
  //   a: 10000
  // }
}

// 5. action
const handleClick5 = () => {
  Auth.setStateA(567)
}

// 解构不具有响应式
// const { a } = Auth
// 可以使用 storeToRefs(Auth)
// const { a } = storeToRefs(Auth)

// 观察 state 当中的值的变化，任何值的变化都会触发此函数
Auth.$subscribe((args, state) => {
  console.log(args)
  console.log(state)
})

// 监听 action 方法的调用
Auth.$onAction((args) => {
  args.after(() => {
    console.log('after')
  })
  console.log(args)
}, true) // 组件销毁后继续监听

</script>

<style lang="scss" scoped>
</style>
