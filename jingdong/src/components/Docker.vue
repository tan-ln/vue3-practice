<template>
  <div class="docker">
    <router-link class="docker__item"
      v-for="(item, index) in dockerList"
      :key="index"
      :class="{'docker__item--active' : index === curIndex}"
      :to="item.to"
    >
      <div class="iconfont" v-html="item.icon" />
      <span class="docker__title" style="{color: red}">{{item.text}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['curIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe609;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe613;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe71f;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe637;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontcolor;

  &__item {
    flex: 1;
    text-align: center;
    color: $content-fontcolor;

    &--active {
      color: $btn-bgColor;
    }
  }

  &__title {
    display: block;
    font-size: 0.26rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
