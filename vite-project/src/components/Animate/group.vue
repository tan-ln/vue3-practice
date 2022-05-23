<template>
  <button @click="add">click to add</button>
  <button @click="pop">click to decrease</button>
  <div class="group__wrapper">
    <transition-group enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__rollOut">
      <div class="item" v-for="item in list" :key="item">
        {{ item }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import 'animate.css'

const list = reactive<number[]>([1, 2, 3, 4])
const add = () => {
  list.push(list.length + 1)
}
const pop = () => {
  list.pop()
}

</script>

<style scoped>
.group__wrapper {
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow-y: scroll;
}

.item {
  font-size: 20px;
  padding: 10px;
}
</style>