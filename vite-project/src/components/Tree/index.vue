<template>
  <ul class="tree__wrapper">
    <li v-for="(item, idx) in data" :key="idx">
      {{ item.name }}
      <Tree v-if="item?.children?.length" :data="item.children" />
    </li>
  </ul>
</template>

<script setup lang="ts">
// 方式 1
// import Tree from './index.vue'

type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
 
type Props<T> = {
  data?: T[] | [];
}

defineProps<Props<TreeList>>()

</script>
<!-- 方式 2 -->
<script lang="ts">
export default {
  name: 'Tree'
}
</script>

<style scoped>
.tree__wrapper {
  display: table-cell;
  width: 500px;
}
</style>