<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import LayoutCarteira from '@/components/Carteiras/Layout.vue';
  import Table from '@/components/Carteiras/Table.vue';
  import { getLocalInvestments, investmentStore } from '@/stores/investment';
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const investments = computed(() => {
    return investmentStore.investments.filter(
      (item) => item.ativo && item.carteira.id === Number(route.params.id)
    );
  });

  const incomes = computed(() => {
    return investments.value.map((item) => {
      return item.rendimentos?.filter((income) => income.papel.id === item.id);
    });
  });

  onMounted(() => {
    getLocalInvestments();
  });
</script>

<template>
  <Layout sidebar>
    <LayoutCarteira>
      <Table :investments="investments" :incomes="incomes" />
    </LayoutCarteira>
  </Layout>
</template>

<style scoped></style>
