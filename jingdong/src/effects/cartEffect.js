import { useStore } from 'vuex'
import { computed } from 'vue'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, goodId, goodInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, goodId, goodInfo, num
    })
  }
  // 商品清单
  const goodList = computed(() => {
    const list = cartList[shopId]?.goodList || {}
    // 排除数量为 0
    const notEmptyList = {}
    for (const key in list) {
      const item = list[key]
      if (item.count > 0) {
        notEmptyList[key] = item
      }
    }
    return notEmptyList
  })
  // shopName
  const shopName = computed(() => {
    const name = cartList[shopId]?.shopName || ''
    return name
  })
  // 计算 总价 总量 是否全部选中
  const caculation = computed(() => {
    const goodList = cartList[shopId]?.goodList || {}
    const result = { total: 0, price: 0, allChecked: true }
    for (const key in goodList) {
      if (!goodList) return 0
      const good = goodList[key]
      // 总量
      result.total += good.count
      // 总价
      if (good.checked) result.price += good.count * good.price
      // 是否全选
      if (good.count > 0 && !good.checked) {
        result.allChecked = false
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return { changeCartItemInfo, cartList, goodList, shopName, caculation }
}
