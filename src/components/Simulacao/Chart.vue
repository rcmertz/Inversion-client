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
    monthlyAmount: number[];
    monthlyAmountWithInterest: number[];
    months: number;
    totalInvested: number;
    totalFinal: number;
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
            data: [...monthlyAmount, totalInvested],
            backgroundColor: '#00ff7f',
            label: 'Total investido',
          },
          {
            data: monthlyAmountWithInterest,
            backgroundColor: '#62d0ff',
            label: 'Total final',
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
    height: 750px;
    width: 100%;
    grid-column: span 3 / span 3;
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;
  }
</style>
