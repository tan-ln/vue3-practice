<template>
  <div class="goods">
    <!-- 左侧菜单栏 -->
    <div class="goods__menu left__block">
      <div class="menu__item"
          :class="{'menu__item--active': curTab === item.tab}"
          v-for="(item) in menuList"
          :key="item.name"
          @click="() => handleTabClick(item.tab)"
      >{{item.name}}</div>
    </div>
    <!-- 右侧商品列表 -->
    <div class="goods__list right__block">
      <div class="list__item" v-for="(item, index) in goodList" :key="index">
        <img :src="require(`@/assets/goodList/${item.imgUrl}`)" :alt="item.name" class="list__item__img" />
        <!-- 商品内容 -->
        <div class="list__item__content good__info">
          <h4 class="good__title">{{item.name}}</h4>
          <p class="good__monthsale">月售{{item.sales}}件</p>
          <p class="good__price">
            <span class="price__unit__yen">&yen;</span>{{item.price}}
            <span class="price__old">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <!-- 加减操作 -->
        <div class="list__item__options">
          <span class="opt__minus iconfont" @click="() => changeCartItem(shopId, item._id, item, -1, shopName)" v-if="getGoodCheckedNum(shopId, item._id)">&#xe6aa;</span>
          <span class="num">{{getGoodCheckedNum(shopId, item._id)}}</span>
          <span class="opt__plus iconfont" @click="() => changeCartItem(shopId, item._id, item, 1, shopName)">&#xe631;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '@/utils/request.js'
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffect'

const menuList = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '时令蔬菜', tab: 'vegetables' }
]
// 左侧菜单
const useMenuListEfect = () => {
  const curTab = ref(menuList[0].tab || 'all')
  const handleTabClick = (tab) => {
    curTab.value = tab
  }
  return { curTab, handleTabClick }
}
// 右侧商品列表
const useGoodListEfect = (shopId, curTab) => {
  const data = reactive({ goodList: [] })
  // get
  const getGoodsData = async () => {
    const res = await get(`/api/shop/${shopId}/goodList`, {
      tab: curTab.value
    })
    if (res?.errno === 0 && res?.data.length) {
      data.goodList = res.data
    }
  }
  // 首次页面加载或者监听内容变化之后
  // 监听 getGoodsData 方法 -> 依赖于 curTab -> curTab 发生变化时重新执行 getGoodsData
  watchEffect(() => {
    getGoodsData()
  })
  const { goodList } = toRefs(data)
  return { goodList }
}
// 购物车
const useCartEffect = () => {
  const store = useStore()
  const { changeCartItemInfo, cartList } = useCommonCartEffect()
  // 同步 store 店名
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  // 同步店铺信息
  const changeCartItem = (shopId, goodId, item, num, shopName) => {
    changeCartItemInfo(shopId, goodId, item, num, shopName)
    changeShopName(shopId, shopName)
  }
  // 获取选中某种商品数量
  const getGoodCheckedNum = (shopId, goodId) => {
    return cartList?.[shopId]?.goodList?.[goodId]?.count || 0
  }
  return { changeCartItem, cartList, getGoodCheckedNum }
}

export default {
  name: 'Goods',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { curTab, handleTabClick } = useMenuListEfect()
    const { goodList } = useGoodListEfect(shopId, curTab)
    const { changeCartItem, cartList, getGoodCheckedNum } = useCartEffect()

    return { shopId, goodList, menuList, curTab, cartList, handleTabClick, changeCartItem, getGoodCheckedNum }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
  .goods {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: 0.5rem;

    &__menu {
      width: 0.76rem;
      height: 100%;
      overflow-y: scroll;
      background-color: $search-bgColor;

      .menu__item {
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.14rem;
        color: $content-fontcolor;

        &--active {
          background-color: #fff;
        }
      }
    }

    &__list {
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;

      .list__item {
        display: flex;
        padding: 0.12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #F1F1F1;
        position: relative;

        &__img {
          width: 0.68rem;
          height: 0.68rem;
          margin-right: 0.16rem;
        }

        &__content {
          flex: 1;
          overflow-x: hidden;
          .good__title {
            @include ellipse;

            margin: 0;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $content-fontcolor;
          }
          .good__monthsale {
            margin: 0.06rem 0;
            height: 0.16rem;
            font-size: 0.12rem;
            color: $content-fontcolor;
          }
          .good__price {
            margin: 0;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $hightlight-fontColor;
            .price__unit__yen {
              font-size: 0.12rem;
            }
            .price__old {
              line-height: 0.2rem;
              font-size: 0.12rem;
              color: $light-fontColor;
              text-decoration: line-through;
              margin-left: 0.06rem;
            }
          }
        }

        &__options {
          position: absolute;
          right: 0;
          bottom: 0.12rem;

          .opt__minus, .opt__plus {
            position: relative;
            top: 0.03rem;
            color: $btn-bgColor;
            font-size: 0.2rem;
          }
          .opt__minus {
            color: #666;
          }
          .num {
            margin: 0 0.08rem;
          }
        }
      }
    }
  }
</style>
