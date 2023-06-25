<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import LayoutCarteira from '@/components/Carteiras/Layout.vue';
  import Table from '@/components/Carteiras/Carteira/Table.vue';
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getLocalOperations, useOperation } from '@/stores/operation';
  import { getLocalInvestments, useInvestment } from '@/stores/investment';
  import { useIncome } from '@/stores/income';

  const route = useRoute();

  const operations = computed(() => {
    return useOperation.operations?.filter((item) => {
      return (
        item.ativo &&
        item.investimento.ativo &&
        item.investimento.carteira?.id === Number(route.params.id)
      );
    });
  });

  const incomes = computed(() => {
    return useIncome.incomes.filter((item) => item.ativo);
  });

  const investments = computed(() => {
    return useInvestment.investments.filter((item) => item.ativo);
  });

  onMounted(async () => {
    await getLocalInvestments();
    await getLocalOperations();
  });
</script>

<template>
  <Layout sidebar>
    <LayoutCarteira>
      <Table :incomes="incomes" :operations="operations" :investments="investments" />
    </LayoutCarteira>
  </Layout>
</template>

<style scoped></style>
