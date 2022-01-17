import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartString = JSON.stringify(cartList)
  localStorage.cartList = cartString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList) || {}
  } catch (error) {
    return {}
  }
}

export default createStore({
  state: {
    // { shopId: { shopName: '', goodList: { goodId:  } } }
    cartList: getLocalCartList()
  },
  mutations: {
    // 购物车添加与删除
    changeCartItemInfo (state, payload) {
      const { shopId, goodId, goodInfo, num } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', goodList: {} }
      let good = shopInfo.goodList[goodId]
      if (!good) {
        good = goodInfo
        good.count = 0
      }
      good.count += num
      if (good.count < 0) good.count = 0
      // (good.count < 0) && (good.count = 0)   // 简写 短路运算符 eslint 报错
      if (num > 0) good.checked = true
      // (num > 0) && (good.checked = true)
      shopInfo.goodList[goodId] = good
      state.cartList[shopId] = shopInfo
      // localStorage
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', goodList: {} }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 购物车商品选中
    changeCartItemCheck (state, payload) {
      const { shopId, goodId } = payload
      const good = state.cartList[shopId].goodList[goodId]
      good.checked = !good.checked
      setLocalCartList(state)
    },
    // 清空购物车
    clearCart (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].goodList = {}
      setLocalCartList(state)
    },
    // 全选
    changeAllChecked (state, payload) {
      const { shopId } = payload
      const goodList = state.cartList[shopId].goodList
      for (const key in goodList) {
        const good = goodList[key]
        good.checked = true
      }
      setLocalCartList(state)
    },
    // 订单提交后清理
    clearCartData (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].goodList = {}
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
