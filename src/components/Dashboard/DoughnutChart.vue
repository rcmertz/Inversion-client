<script setup lang="ts">
  import { getLocalOperations, useOperation } from '@/stores/operation';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  import { computed, onMounted } from 'vue';
  import { Doughnut } from 'vue-chartjs';

  ChartJS.register(ArcElement, Tooltip, Legend);

  const salesOperation = computed(() => {
    return useOperation.operations.filter((item) => item.ativo && item.tipo === 'venda');
  });

  const purchaseOperation = computed(() => {
    return useOperation.operations.filter((item) => item.ativo && item.tipo === 'compra');
  });

  onMounted(() => {
    getLocalOperations();
  });
</script>

<template>
  <Doughnut
    :data="{
      labels: ['Compra', 'Venda'],
      datasets: [
        {
          data: [
            purchaseOperation.reduce((acc, curr) => {
              return acc + curr.valor * curr.quantidade;
            }, 0),
            salesOperation.reduce((acc, curr) => {
              return acc + curr.valor * curr.quantidade;
            }, 0),
          ],
          backgroundColor: ['#00ff7f', '#62d0ff'],
        },
      ],
    }"
    :options="{
      responsive: true,
      maintainAspectRatio: false,
    }"
  />
</template>
