<template>
  <div>
    <h1>Cart</h1>
    <h2>id: {{ route.params.id }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style scoped>

</style>