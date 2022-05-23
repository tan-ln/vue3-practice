<template>
  <div class="async__component">
    <div v-for="item in list" :key="item.name">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { axios } from "./api";
const list = await axios('./data.json')
console.log(list);

</script>

<style scoped>
.async__component {
  display: inline;
}
</style>