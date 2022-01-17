<template>
  <div class="products">
    <div class="products__title">{{shopName}}</div>
    <div class="products__List">
      <div class="list__item" v-for="(item, index) in goodList" :key="index">
        <img :src="require(`@/assets/goodList/${item.imgUrl}`)" :alt="item.name" class="list__item__img" />
        <!-- 商品内容 -->
        <div class="list__item__content good__info">
          <h4 class="good__title">{{item.name}}</h4>
          <p class="good__price">
            <span class="price__unit">
              <span class="yen">&yen;</span>
              {{item.price}} x {{item.count}}
            </span>
            <span class="price__amount">
              <span class="yen">&yen;</span>
              {{(item.price * item.count).toFixed(2)}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffect'
import { useRoute } from 'vue-router'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { goodList, shopName } = useCommonCartEffect(shopId)
    return { goodList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.products {
  margin: 0.16rem .18rem .18rem .18rem;
  background-color: #fff;
  flex: 1;
  overflow-y: scroll;
  &__title {
    font-size: 0.16rem;
    color: #333;
    padding: 0.16rem .16rem 0 .16rem;
  }
  .list__item {
    display: flex;
    padding: 0.16rem;
    position: relative;

    &__img {
      width: 0.46rem;
      height: 0.46rem;
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
      .good__price {
        margin: .06rem 0 0 0;
        line-height: 0.2rem;
        font-size: 0.14rem;
        display: flex;
        color: $content-fontcolor;
        .price__unit {
          font-size: 0.12rem;
          color: $hightlight-fontColor;
          width: 1rem;
        }
        .price__amount {
          flex: 1;
          text-align: right;
          color: #000
        }
      }
    }
  }
}
.yen {
  font-size: 0.12rem;
  display: inline-block;
  transform: scale(.85);
  transform-origin: right center;
}
</style>
