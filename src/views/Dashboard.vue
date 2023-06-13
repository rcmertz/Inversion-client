<script setup lang="ts">
  import Chart from '@/components/Dashboard/Chart.vue';
  import DashboardHeader from '@/components/Dashboard/Header.vue';
  import StatusCard from '@/components/Dashboard/StatusCard.vue';
  import Layout from '@/components/Layout.vue';
  import { status } from '@/data/dashboard';
</script>

<template>
  <Layout sidebar>
    <section>
      <DashboardHeader />
      <ul class="status-list">
        <StatusCard v-for="item in status" :key="item.id" :item="item" />
      </ul>
      <Chart />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }

  .status-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    margin-bottom: 90px
  }
</style>
