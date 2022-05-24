<template>
  <div>
    <h1>User</h1>
    <h2>username: {{ route.params.username }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style scoped>

</style>