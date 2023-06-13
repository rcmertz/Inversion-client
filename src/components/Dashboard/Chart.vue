<script setup lang="ts">
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { chartData } from '@/data/chart';

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
</script>

<template>
  <!-- :data="{
    labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [{ label: semana, data: dados, backgroundColor: cores }],
  }" -->
  <div class="container">
    <Line
      :data="chartData"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
      }"
    />
  </div>
</template>

<style scoped>
  .container {
    height: 450px;
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;
  }
</style>
