<template>
  <div>
    <h1>login</h1>
    <h2>id: {{ route.query.id }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style scoped>

</style>