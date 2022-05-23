<template>
  <div class="animate__wrapper">
    <button @click="flag = !flag">click to show animtion</button>
    <transition
      @before-enter="EnterFrom"
      @enter="EnterActive"
      @leave="Leave"
    >
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gsap from 'gsap'

const flag = ref<boolean>(false)

const EnterFrom = (el: Element) => {
  gsap.set(el, {
    width: 0,
    height: 0
  })
}
const EnterActive = (el: Element, done: gsap.Callback) => {
  gsap.to(el, {
    width: 400,
    height: 400,
    onComplete: done
  })
}
const Leave = (el: Element, done: gsap.Callback) => {
  gsap.to(el, {
    width: 0,
    height: 0,
    onComplete: done
  })
}

</script>

<style scoped>
.box {
  background-color: rgb(179, 61, 61);
}
</style>