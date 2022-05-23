<template>
  <div class="num__wrapper">
    <input v-model="num.current" type="number" step="20" />
    <div>
      {{ num.tweenedNum.toFixed() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import gsap from 'gsap'

const num = reactive({
  current: 0,
  tweenedNum: 0
})
watch(
  () => num.current,
  (newVal, oldVal) => {
    gsap.to(num, {
      tweenedNum: newVal,
      duration: 1
    })
  }
)

</script>

<style scoped>
.num__wrapper {
  position: absolute;
  right: 100px;
  top: 350px;
}
</style>