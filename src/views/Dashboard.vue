<script setup lang="ts">
  import Chart from '@/components/Dashboard/Chart.vue';
  import DashboardHeader from '@/components/Dashboard/Header.vue';
  import StatusCard from '@/components/Dashboard/StatusCard.vue';
  import Layout from '@/components/Layout.vue';
  import { useIncome } from '@/stores/income';
  import { getLocalOperations, useOperation } from '@/stores/operation';
  import { computed, onMounted } from 'vue';

  const incomes = computed(() => {
    return useIncome.incomes.filter((item) => item.ativo && item.operacao.ativo);
  });

  const totalIncome = computed(() => {
    return incomes.value.reduce((acc, curr) => {
      return acc + curr.preco_un * curr.quantidade;
    }, 0);
  });

  const operations = computed(() => {
    return useOperation.operations.filter((item) => item.ativo && item.investimento.ativo);
  });

  const totalOperations = computed(() => {
    return operations.value.reduce((acc, curr) => {
      return acc + curr.valor * curr.quantidade;
    }, 0);
  });

  onMounted(async () => {
    await getLocalOperations();
  });
</script>

<template>
  <Layout sidebar>
    <section>
      <DashboardHeader />
      <ul class="status-list">
        <StatusCard title="Visão geral" value="Dashboard" icon="ph:eye" />
        <StatusCard
          title="Rendimentos"
          value="Total"
          icon="ph:identification-badge"
          :total="totalIncome"
        />
        <StatusCard
          title="Carteiras"
          value="Total"
          icon="ph:user-rectangle"
          :total="totalOperations + totalIncome"
        />
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
    margin-bottom: 90px;
  }
</style>
