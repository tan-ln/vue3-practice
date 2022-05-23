<template>
  <!-- <Card content="content" /> -->
  <Tree :data="data" />
  <Tabs />
  <Animate />
  <!-- <AsyncComp /> -->
  <Suspense>
    <template #default>
      <AsyncComp />
    </template>
    <template #fallback>
      <div>loading</div>
    </template>
  </Suspense>
  <Group />
  <Flip />
  <Number />
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent, Suspense } from "vue"
import Tree from './components/Tree/index.vue'
import Tabs from './components/Tab/index.vue'
// import AsyncComp from './components/AsyncComp/index.vue'
import Animate from './components/Animate/index.vue'
import Group from './components/Animate/group.vue'
import Flip from './components/Animate/flip.vue'
import Number from './components/Animate/number.vue'

type TreeList = {
  name: string,
  icon?: string,
  children?: TreeList[] | []
}
const data = reactive<TreeList[]>([
  {
    name: 'no_1',
    children: [
      {
        name: 'no_1_1',
        children: [
          { name: 'no_1_1_1', }
        ]
      }, {
        name: 'no_1_2',
      }
    ]
  },
  {
    name: 'no_2',
    children: [
      {
        name: 'no_2_1',
        children: [
          { name: 'no_2_1_1', }
        ]
      }, {
        name: 'no_2_2',
        children: [
          { name: 'no_2_2_1', }
        ]
      }
    ]
  },
  {
    name: 'no_3',
  },
  {
    name: 'no_4',
    children: [
      {
        name: 'no_4_1',
        children: [
          { name: 'no_4_1_1', }
        ]
      }, {
        name: 'no_4_2',
        children: [
          { name: 'no_4_2_1', }
        ]
      }
    ]
  }
])

// 异步组件
const AsyncComp = defineAsyncComponent(() => import('./components/AsyncComp/index.vue'))

</script>
