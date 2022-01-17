<template>
  <div>
    <div class="wrapper">
      <!-- 顶部静态展示部分 -->
      <StaticPart />
      <!-- 附近店铺 -->
      <Nearby />
    </div>
    <!-- 底部导航栏 -->
    <Docker :curIndex="0" />
  </div>
</template>

<script>
import Nearby from './Nearby'
import StaticPart from './StaticPart'
import Docker from '../../components/Docker'

export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0.5rem;
  left: 0;
  padding: 0 0.18rem .1rem .18rem;
}
.iconfont {
  font-size: 0.16rem;
  margin: 0.07rem 0 0.02rem 0;
}
</style>
