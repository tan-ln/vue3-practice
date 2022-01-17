<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'Toast',
  props: ['message']
}

export const useToastEffect = () => {
  const toastData = reactive({
    isshowToast: false,
    toastMsg: ''
  })
  const showToast = (msg) => {
    toastData.isshowToast = true
    toastData.toastMsg = msg
    setTimeout(() => {
      toastData.isshowToast = false
      toastData.toastMsg = ''
    }, 2000)
  }
  const { isshowToast, toastMsg } = toRefs(toastData)
  return { isshowToast, toastMsg, showToast }
}

</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .35);
  padding: 0.1rem;
  border-radius: .05rem;
  color: #fff;
}
</style>
