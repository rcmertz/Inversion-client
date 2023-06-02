<script setup lang="ts">
  import { Icon } from '@iconify/vue';

  interface Props {
    item: {
      id: string;
      title: string;
      value: string;
      income: number;
      icon: string;
    };
  }

  defineProps<Props>();
</script>

<template>
  <li>
    <h6>{{ item.title }}</h6>
    <Icon :icon="item.icon" class="status-icon" />
    <h4>{{ item.value }}</h4>
    <div v-if="item.income > 0" class="income positive-income">
      <p>+ {{ item.income }}%</p>
      <Icon icon="ant-design:rise-outlined" class="income-icon" />
    </div>
    <div v-else-if="item.income < 0" class="income negative-income">
      <p>{{ item.income }}%</p>
      <Icon icon="ant-design:fall-outlined" class="income-icon" />
    </div>
    <div v-else class="income neutral-income">
      <p>{{ item.income }}%</p>
    </div>
  </li>
</template>

<style scoped>
  li {
    width: 33.33333%;
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
