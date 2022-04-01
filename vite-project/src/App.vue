<template>
  <h1>{{ message }}</h1>
  <div :style="style"></div>
</template>

<script setup lang="ts">
  const message: string = 'hello world'

  type Style = {
    backgroundColor: string,
    height: string
  }

  const style: Style = {
    backgroundColor: 'skyblue',
    height: '200px'
  }
</script>

<style>

</style>
