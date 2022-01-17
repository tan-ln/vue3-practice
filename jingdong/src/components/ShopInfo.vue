<template>
  <div class="nearby__item shop">
    <img
      class="shop__img"
      :src="item.imgUrl || require('@/assets/near.png')"
      :alt="item.title"
    />
    <div class="shop__content" :class="{ 'shop__content--bordered': hideBorder ? false : true }">
      <div class="shop__content--title">{{item.name}}</div>
      <div class="shop__content--tags">
        <span class="shop__tag">月售:{{item.sales}}</span>
        <span class="shop__tag">起送:{{item.expressPrice}}</span>
        <span class="shop__tag">基础运费:{{item.expressLimit}}</span>
      </div>
      <p class="shop__content--highlight">{{item.slogan}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.shop {
    display: flex;
    padding-top: 0.12rem;

    .shop__img {
      width: 0.56rem;
      height: 0.56rem;
      margin-right: 0.16rem;
    }
    .shop__content {
      flex: 1;
      padding-bottom: 0.12rem;

      &--bordered {
        border-bottom: .01rem solid $content-bgColor;
      }

      &--title {
        line-height: 0.22rem;
        font-size: 0.16rem;
        color: $content-fontcolor;
      }
      &--tags {
        margin-top: 0.08rem;
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: $content-fontcolor;

        .shop__tag {
          margin-right: 0.16rem;
        }
      }

      &--highlight {
        margin: 0.08rem 0 0 0;
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: $hightlight-fontColor;
      }
    }
}
</style>
