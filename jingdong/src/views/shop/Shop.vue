<template>
  <div class="wrapper">
    <!-- 顶部搜索 -->
    <div class="search">
      <div class="search__back iconfont" @click="this.$router.back(-1)">&#xe608;</div>
      <div class="search__content">
        <span class="search__content--icon iconfont">&#xe6d2;</span>
        <input type="search" class="search__content--input" placeholder="店内搜索" />
      </div>
    </div>
    <!-- 店铺头部展示 -->
    <ShopInfo :item="item" :hideBorder="true" v-show="item._id" />
    <!-- 商品展示 -->
    <Goods :shopName="item.name" />
    <!-- 底部购物车 -->
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import ShopInfo from '@/components/ShopInfo'
import Goods from './Goods'
import Cart from './Cart'
import { get } from '@/utils/request.js'

// 获取当前店铺信息
const useShopInfoEffect = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getItemData = async () => {
    const res = await get(`/api/shop/${route.params.id}`)
    if (res?.errno === 0 && Object.keys(res?.data).length) {
      if (res.data.sales > 9999) {
        res.data.sales = res.data.sales / 10000 + '万'
      }
      data.item = res.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Goods,
    Cart
  },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    getItemData()
    return { item }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
.wrapper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  height: 0.32rem;
  line-height: 0.32rem;
  margin: 0.14rem 0 .04rem 0;

  .iconfont {
    margin: 0;
  }

  &__back {
    width: 0.32rem;
    height: 0.32rem;
    font-size: 0.24rem;
    color: #B6B6B6;
  }

  &__content {
    flex: 1;
    line-height: .32rem;
    background-color: #F5F5F5;
    border-radius: .16rem;
    display: flex;

    &--icon {
      width: 0.44rem;
      text-align: center;
      font-size: 0.18rem;
      color: #B7B7B7;
    }

    &--input {
      @include cleaninput;

      display: block;
      width: 100%;
      padding-right: 0.2rem;
      height: 0.32rem;
      color: $content-fontcolor;
      font-size: 0.14rem;

      &::placeholder {
        color: $content-fontcolor;
        font-size: 0.14rem;
      }
    }
  }
}
</style>
