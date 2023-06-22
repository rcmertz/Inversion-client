<script setup lang="ts">
  import InvestimentoForm from '@/components/Investimento/Editar/InvestimentoForm.vue';
  import Layout from '@/components/Layout.vue';
  import { getLocalInvestment, investmentStore } from '@/stores/investment';
  import { onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const investment = computed(() => {
    return { ...investmentStore.investment! };
  });

  const wallet = computed(() => {
    return { ...investment.value.carteira };
  });

  onMounted(() => {
    getLocalInvestment(Number(route.params.id));
  });
</script>

<template>
  <Layout sidebar>
    <section>
      <InvestimentoForm :investment="investment" :wallet="wallet" />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }
</style>
