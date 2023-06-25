<script setup lang="ts">
  import { formatCurrency } from '@/utils/formatCurrency';
import { Icon } from '@iconify/vue';

  interface Props {
    title: string;
    value: string;
    total?: number;
    icon: string;
  }

  defineProps<Props>();
</script>

<template>
  <li>
    <h6>{{ title }}</h6>
    <Icon :icon="icon" class="status-icon" v-if="icon" />
    <h4>{{ value }}</h4>
    <div v-if="!isNaN(total!)" class="income">
      <p>{{ formatCurrency(total!) }}</p>
    </div>
  </li>
</template>

<style scoped>
  li {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    row-gap: 12px;
    background-color: var(--dashboard-status-card);
    border-radius: 16px;
    padding: 24px 24px 32px;
  }

  h6 {
    font-family: var(--inter);
    font-size: 14px;
    font-weight: 600;
    color: var(--dashboard-status-text);
  }

  h4 {
    font-family: var(--inter);
    font-size: 24px;
    font-weight: 600;
  }

  .status-icon {
    justify-self: flex-end;
    color: var(--dashboard-status-text);
    font-size: 28px;
  }

  .income {
    display: flex;
    align-items: center;
    justify-self: flex-end;
    gap: 4px;
  }

  .income > p {
    font-family: var(--inter);
    font-size: 14px;
  }

  .negative-income > p {
    color: var(--dashboard-status-loss);
  }

  .income-icon {
    font-size: 20px;
  }
</style>
