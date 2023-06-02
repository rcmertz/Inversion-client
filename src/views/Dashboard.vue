<script setup lang="ts">
  import DashboardHeader from '@/components/Dashboard/Header.vue';
  import StatusCard from '@/components/Dashboard/StatusCard.vue';
  import { status } from '@/data/dashboard';
</script>

<template>
  <section>
    <DashboardHeader />
    <ul class="status-list">
      <StatusCard v-for="item in status" :key="item.id" :item="item" />
    </ul>
  </section>
</template>

<style scoped>
  section {
    padding: 52px;
    width: 66vw;
  }

  .status-list {
    display: flex;
    gap: 28px;
  }
</style>
