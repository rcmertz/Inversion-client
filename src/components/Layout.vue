<script setup lang="ts">
  import { isOpen } from '@/stores/sidebar';
  import Sidebar from './Sidebar.vue';

  interface Props {
    sidebar?: boolean;
  }

  defineProps<Props>();
</script>

<template>
  <Sidebar v-if="sidebar" />

  <main :class="sidebar ? isOpen ? 'slot open' : 'slot' : ''">
    <slot></slot>
  </main>
</template>

<style scoped>
  .slot {
    margin-left: 102px;
    transition: all 0.3s;
  }

  .slot.open {
    margin-left: 378px;
  }
</style>
