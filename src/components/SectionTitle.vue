<script setup lang="ts">
  interface Props {
    title: string;
  }

  defineProps<Props>();
</script>

<template>
  <h2>{{ title }}</h2>
</template>

<style scoped>
  h2 {
    color: #312b2b;
    border-left: 4px solid #435669;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 36px;
    padding-left: 15px;
    text-transform: uppercase;
  }
</style>
