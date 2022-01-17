<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="this.$router.back(-1)">&#xe608;</div>
      <span>确认订单</span>
    </div>
    <!-- 收货人 -->
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__addr">圣诞节牢记董卿将围绕</div>
      <div class="top__receiver__info">
        <span class="top__receiver__name">Lucifer</span>
        <span class="top__receiver__phone">132465879</span>
      </div>
      <div class="top__receiver__icon iconfont">&#xe608;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopArea'
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.top {
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;
  position: relative;

  &__header {
    padding-top: 0.2rem;
    line-height: 0.24rem;
    font-size: 0.16rem;
    color: #fff;
    text-align: center;
    position: relative;

    &__back {
      position: absolute;
      font-size: 0.22rem;
      left: 0.18rem;
      margin: 0;
    }
  }

  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background-color: #fff;
    border-radius: .04rem;
    color: #333;

    &__title {
      padding: 0.16rem 0 .14rem .16rem;
      line-height: .22rem;
      font-size: 0.16rem;
    }
    &__addr {
      line-height: 0.2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: 0.14rem;
    }
    &__info {
      padding: 0.06rem 0 0 .16rem;

      span {
        color: #666;
        font-size: 0.12rem;
        height: 0.18rem;
        margin-right: 0.06rem;
      }
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.4rem;
      color: #666;
      font-size: 0.16rem;
      transform: rotate(180deg);
    }
  }
}
</style>
