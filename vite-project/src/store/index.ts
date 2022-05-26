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
    a: <number> 1,
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
    setStateA (num: number) {
      this.a = num
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
      this.setStateA(98765)
    }
  }
})

/**
 * getter 和 action 当中的方法可以互相调用
 */
