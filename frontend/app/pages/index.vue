<template>
  <div>
    <h1>Hello World {{ version }}</h1>
  </div>
</template>

<script setup lang="ts">
const version = useRuntimeConfig().public.version;
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>