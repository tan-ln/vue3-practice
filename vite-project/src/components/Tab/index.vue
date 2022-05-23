<template>
  <div class="tab">
    <div class="tab__item" v-for="tab in tabs" :key="tab.name" @click="() => handleChangeTab(tab)">
      {{ tab.name }}
    </div>
    <component class="tab__content" :is="curTab.compName"></component>
  </div>
</template>

<script setup lang="ts">
import { markRaw, reactive } from "vue";
import A from "./A.vue"
import B from "./B.vue"
import C from "./C.vue"

type Tabs = {
  name: string,
  compName: any
}
type Comp = Pick<Tabs, 'compName'>

const tabs = reactive<Tabs[]>([
  {
    name: 'A component',
    compName: markRaw(A)          // 标记 组件不需要 proxy 代理
  }, {
    name: 'B component',
    compName: markRaw(B)
  }, {
    name: 'C component',
    compName: markRaw(C)
  },
])
let curTab = reactive<Comp>({
  compName: tabs[0].compName
})

const handleChangeTab = (tab: Tabs) => {
  curTab.compName = tab.compName
}

</script>

<style scoped>
.tab {
  display: table-cell;
  width: 500px;
  border: 1px solid #ccc;
  padding: 10px;
}
.tab__item {
  display: inline-block;
  margin-right: 10px;
  padding: 10px;
  background-color: rgb(87, 208, 233);
  cursor: pointer;
}
.tab__content {
  height: 80px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
</style>