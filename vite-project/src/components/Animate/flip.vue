<template>
  <div class="flip__wrapper">
    <button @click="random">random</button>
    <transition-group
      tag="div"
      class="content"
      move-class="moveStyle"
    >
      <div class="item" v-for="item in list" :key="item.id">
        {{ item.number }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import _ from 'lodash'

let list = ref(
  Array.apply(null, { length: 81 } as number[])
    .map((_, idx) => {
      return {
        id: idx,
        number: (idx % 9) + 1
      }
    })
)

const random = () => {
  // list.value = _.shuffle(list.value)
  list.value = list.value.sort(() => Math.random() * 2 - 1)
}

</script>

<style scoped>
.flip__wrapper {
  position: absolute;
  right: 0;
  top: 350px;
  right: 500px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: calc(25px * 10 + 9px);
}
.item {
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  text-align: center;
}
.moveStyle {
  transition: all .8s ease-in-out;
}
</style>