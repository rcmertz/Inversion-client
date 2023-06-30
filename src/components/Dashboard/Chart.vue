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
  import { IOperation } from '@/interfaces/operation';
  import { computed } from 'vue';
  import { IIncome } from '@/interfaces/income';

  interface Props {
    operations: IOperation[];
    incomes: IIncome[];
    totalIncomes: number;
    total: number;
  }

  const props = defineProps<Props>();

  // operações de compra
  const purchaseOperations = computed(() => {
    return props.operations.reduce((acc, curr) => {
      if (curr.tipo === 'compra') {
        return acc + curr.valor * curr.quantidade;
      } else {
        return acc;
      }
    }, 0);
  });

  // rendimentos atrelados à operações de compra
  const purchaseIncomes = computed(() => {
    return props.incomes.reduce((acc, curr) => {
      if (curr.operacao.tipo === 'compra') {
        return acc + curr.preco_un * curr.quantidade;
      } else {
        return acc;
      }
    }, 0);
  });

  const purchaseTotal = purchaseOperations.value + purchaseIncomes.value;

  // operações de venda
  const salesOperations = computed(() => {
    return props.operations.reduce((acc, curr) => {
      if (curr.tipo === 'venda') {
        return acc + curr.valor * curr.quantidade;
      } else {
        return acc;
      }
    }, 0);
  });

  // rendimentos atrelados à operações de venda
  const salesIncomes = computed(() => {
    return props.incomes.reduce((acc, curr) => {
      if (curr.operacao.tipo === 'venda') {
        return acc + curr.preco_un * curr.quantidade;
      } else {
        return acc;
      }
    }, 0);
  });

  const salesTotal = salesOperations.value + salesIncomes.value;

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
</script>

<template>
  <div class="container">
    <Bar
      :data="{
        labels: ['Operações', 'Rendimentos', 'Carteiras'],
        datasets: [
          {
            data: [purchaseOperations, purchaseIncomes, purchaseTotal],
            backgroundColor: '#00ff7f',
            label: 'Compras',
          },
          {
            data: [salesOperations, salesIncomes, salesTotal],
            backgroundColor: '#62d0ff',
            label: 'Vendas',
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
