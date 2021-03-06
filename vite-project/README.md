# Try Vite

Vite 构建工具，，使用 ，插件丰富

优势：
- 冷服务，基于 ESModule 通过 script 标签 （webpack 需要先打包）
```html
<script type="module" src="/src/main.ts"></script>
```
- HMR 模块热更新
- Rollup 打包，支持 Rollup 插件


## 异步组件
打包过程中的阻塞，单独打包，异步加载

## pinia 代替 vuex
```ts
import { defineStore } from 'pinia'
import { Names } from './store-name'

type User = {
  name: string,
  age: number,
}

const login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '000',
        age: 0
      })
    }, 1000)
  })
}

export const useAuthStore = defineStore(Names.AUTH, {
  state: () => ({
    a: <number | string> 1,
    user: <User> {}
  }),
  // 有缓存 computed
  getters: {
    // ts 无法自动推导
    // 需要手动定义返回值类型
    newName (): string {
      return `prefix-${this.user.name}`
    }
  },
  // 同步/异步
  actions: {
    setStateA (num: number | string) {
      this.a = num || '999'
    },
    setUser () {
      this.user = {
        name: 'tan',
        age: 10000
      }
    },
    async setAsyncUser () {
      const res = await login()
      this.user = res
      this.setStateA('hhhh')
    }
  }
})

/**
 * getter 和 action 当中的方法可以互相调用
 */
```