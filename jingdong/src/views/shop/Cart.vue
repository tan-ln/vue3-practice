<template>
  <div class="cart">
    <!-- 购物车商品展示区 -->
    <div class="cart__list" v-if="showCart && caculation.total">
      <div class="cart__list__header">
        <div class="cart__check__all" @click="() => changeAllChecked(shopId)">
          <span class="checked_all_icon iconfont" v-html="caculation.allChecked ? '&#xe6e6;' : '&#xecc5;'"></span>
          <span class="checked__all_text">全选</span>
        </div>
        <div class="cart__clear">
          <span @click="() => clearCart(shopId)">清空购物车</span>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="list__item" v-for="item in goodList" :key="item._id">
        <!-- 多选框 -->
        <div class="list__item__checked iconfont" v-html="item.checked ? '&#xe6e6;' : '&#xecc5;'" @click="() => changeItemChecked(shopId, item._id)"></div>
        <!-- 商品图片 -->
        <img :src="require(`@/assets/goodList/${item.imgUrl}`)" :alt="item.name" class="list__item__img" />
        <!-- 商品内容 -->
        <div class="list__item__content good__info">
          <h4 class="good__title">{{item.name}}</h4>
          <p class="good__price">
            <span class="price__unit__yen">&yen;</span>{{item.price}}
            <span class="price__old">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <!-- 加减操作 -->
        <div class="list__item__options">
          <span class="iconfont opt__minus" @click="() => changeCartItemInfo(shopId, item._id, item, -1)">&#xe6aa;</span>
          <span class="num">{{item.count || 0}}</span>
          <span class="iconfont opt__plus" @click="() => changeCartItemInfo(shopId, item._id, item, 1)">&#xe631;</span>
        </div>
      </div>
    </div>
    <!-- 底部操作区 -->
    <div class="check">
      <div class="check__icon" @click="changeCartShow">
        <img :src="require('@/assets/basket.png')" alt="" class="check__icon__img" />
        <div class="check__icon__tag">{{caculation.total}}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen; {{caculation.price}}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ path: caculation.total ? `/orderConfirm/${shopId}` : '' }">去结算</router-link>
      </div>
    </div>
  </div>
  <!-- 蒙层 -->
  <div class="mask" v-if="showCart && caculation.total" @click="hideCart"></div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffect'

// 购物车
const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  // 购物车勾选商品
  const changeItemChecked = (shopId, goodId) => {
    store.commit('changeCartItemCheck', { shopId, goodId })
  }
  // 清空购物车
  const clearCart = (shopId) => {
    store.commit('clearCart', { shopId })
  }
  // 全选购物车商品
  const changeAllChecked = (shopId) => {
    store.commit('changeAllChecked', { shopId })
  }
  const { goodList, changeCartItemInfo, caculation } = useCommonCartEffect(shopId)
  return { caculation, goodList, shopId, changeCartItemInfo, changeItemChecked, clearCart, changeAllChecked }
}
// 展示隐藏购物车
const toggleCartEffect = (data) => {
  const showCart = ref(false)
  const changeCartShow = () => {
    showCart.value = data.value.total ? !showCart.value : false
  }
  // 关闭购物车
  const hideCart = () => {
    showCart.value = false
  }
  return { showCart, changeCartShow, hideCart }
}

export default {
  name: 'Cart',
  setup () {
    const { caculation, goodList, shopId, changeCartItemInfo, changeItemChecked, clearCart, changeAllChecked } = useCartEffect()
    const { showCart, changeCartShow, hideCart } = toggleCartEffect(caculation)
    return { caculation, goodList, shopId, changeCartItemInfo, changeItemChecked, clearCart, changeAllChecked, showCart, changeCartShow, hideCart }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: .5);
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #fff;
}
.check {
  display: flex;
  box-sizing: border-box;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;

  &__icon {
    width: 0.84rem;
    position: relative;

    &__img {
      width: .28rem;
      height: 0.26rem;
      display: block;
      margin: .12rem auto;
    }

    &__tag {
      position: absolute;
      left: 0.48rem;
      top: 0.04rem;
      padding: 0 .04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      font-size: 0.12rem;
      color: #fff;
      text-align: center;
      border-radius: .1rem;
      transform: scale(.7);
      transform-origin: left center;
    }
  }

  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }

  &__btn {
    width: 0.98rem;
    line-height: 0.49rem;
    color: #fff;
    font-size: 0.14rem;
    background-color: $btn-bgColor;
    text-align: center;
  }
}
// 购物车
.cart__list {
  overflow-y: scroll;
  background-color: #fff;

  &__header {
    display: flex;
    height: 0.52rem;
    line-height: 0.52rem;
    border-bottom: .01rem solid $content-bgColor;
    font-size: 0.14rem;
    color: $content-fontcolor;

    .cart__check__all {
      width: 0.64rem;
      margin-left: 0.16rem;

      .checked_all_icon {
        font-size: 0.2rem;
        color: $btn-bgColor;
        vertical-align: middle;
      }
      .checked__all_text {
        vertical-align: middle;
        margin-left: 0.1rem;
      }
    }
    .cart__clear {
      flex: 1;
      text-align: right;
      margin-right: 0.16rem;
      span {
        vertical-align: middle;
      }
    }
  }
}
.list__item {
  display: flex;
  padding: 0.12rem 0;
  margin: 0 .16rem;
  border-bottom: .01rem solid $content-bgColor;
  position: relative;

  &__checked {
    color: $btn-bgColor;
    font-size: 0.2rem;
    line-height: 0.5rem;
    margin-right: 0.2rem;
  }

  &__img {
    width: 0.46rem;
    height: 0.46rem;
    margin-right: 0.16rem;
    margin-top: .07rem;
  }

  &__content {
    flex: 1;
    overflow-x: hidden;

    .good__title {
      @include ellipse;

      margin: 0;
      line-height: 0.3rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    .good__price {
      margin: 0;
      line-height: 0.3rem;
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
    bottom: 0.26rem;

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
</style>
