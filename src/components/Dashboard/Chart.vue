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
  import { IOperation } from '@/interfaces/operation';
  import { computed } from 'vue';
  import { formatDate } from '@/utils/formatDate';

  interface Props {
    operations: IOperation[];
  }

  const props = defineProps<Props>();

  const operationsDate = computed(() => {
    return props.operations.map((item) => {
      return formatDate(item.data);
    });
  });

  const operationsValue = computed(() => {
    return props.operations.map((item) => {
      return item.valor * item.quantidade;
    });
  });

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
</script>

<template>
  <div class="container">
    <Line
      :data="{
        labels: operationsDate,
        datasets: [
          {
            data: operationsValue,
            label: 'Todos os dias',
            backgroundColor: '#00ff7f',
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
    height: 450px;
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;
  }
</style>
