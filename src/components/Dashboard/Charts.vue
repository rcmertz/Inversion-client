<script setup lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
  import { Bar } from 'vue-chartjs';
  import { computed, onMounted } from 'vue';
  import Doughnut from './DoughnutChart.vue';
  import { getLocalWallets, useWallet } from '@/stores/wallet';

  const wallets = computed(() => {
    return useWallet.wallets.filter((item) => item.ativo);
  });

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  onMounted(() => {
    getLocalWallets();
  });
</script>

<template>
  <div class="charts">
    <div class="container">
      <Doughnut />
    </div>
    <div class="container">
      <Bar
        :data="{
          labels: ['Carteiras'],
          datasets: wallets.map((item) => {
            return {
              data: [item.valorCarteira],
              backgroundColor: '#00ff7f',
              label: item.descricaoCarteira,
            };
          }),
        }"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
  .container {
    height: 450px;
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;
  }

  .charts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .container:last-child {
    grid-column: span 2 / span 2;
  }
</style>
