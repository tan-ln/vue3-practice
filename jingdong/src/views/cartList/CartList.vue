<template>
  <div class="wrapper">
    cartList
  </div>
  <!-- 底部导航栏 -->
  <Docker :curIndex="1" />
</template>

<script>
import Docker from '../../components/Docker'

export default {
  name: 'CartList',
  components: { Docker }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: .5rem;
  padding: 0 .18rem .1rem .18rem;
}
</style>
