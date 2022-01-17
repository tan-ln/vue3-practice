<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Ordered />
  </div>
</template>

<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Ordered from './Ordered.vue'

export default {
  name: 'OrderConfirm',
  components: {
    TopArea,
    ProductList,
    Ordered
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(247, 247, 247);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>
