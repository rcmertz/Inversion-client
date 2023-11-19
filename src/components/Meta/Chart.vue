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

  interface Props {
    valorRealizado?: number;
    valorMeta?: number;
    monthlyMeta: number[];
    monthlyFulfilled: number[];
    months: number;
  }

  defineProps<Props>();

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
</script>

<template>
  <div class="container">
    <Bar
      :data="{
        labels: [...Array(months)].map((_, index) => 'Mês ' + (index + 1)),
        datasets: [
          {
            data: [...monthlyFulfilled],
            backgroundColor: '#00ff7f',
            label: 'Valor Realizado',
          },
          {
            data: [...Array(months)].map((_) => valorMeta!),
            backgroundColor: '#62d0ff',
            label: 'Valor da Meta',
          },
        ],
      }"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
      }"
    />
  </div>
</template>

<style scoped>
  .container {
    height: 500px;
    width: 75%;
    margin-bottom: 40px;
  }

  @media (max-width: 1400px) {
    .container {
      width: 75%;
    }
  }

  @media (max-width: 750px) {
    .container {
      width: 100%;
    }
  }
</style>
