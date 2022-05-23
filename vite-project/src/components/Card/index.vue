<template>
  <div class="card">
    <div class="card__header">
      <div>主标题</div>
      <div>副标题</div>
    </div>
    <div v-if="content" class="card__content">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  content?: string
}
defineProps<Props>()

</script>

<style scoped>
.card {
  border: 1px solid #ccc;
}
.card__header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.card__content {
  padding: 10px;
}
</style>