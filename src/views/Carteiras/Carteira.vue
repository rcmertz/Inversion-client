<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import LayoutCarteira from '@/components/Carteiras/Layout.vue';
  import Table from '@/components/Carteiras/Carteira/Table.vue';
  import { computed, onMounted, onUpdated, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    getLocalOperationsByDate,
    getLocalOperationsByDateAndInvestment,
    getLocalOperationsByInvestment,
    getLocalOperationsByWallet,
    useOperation,
  } from '@/stores/operation';
  import { getLocalInvestmentsOnly, useInvestment } from '@/stores/investment';
  import { useIncome } from '@/stores/income';
  import Navigation from '@/components/Carteiras/Carteira/Navigation.vue';
  import Filters from '@/components/Carteiras/Carteira/Filters.vue';
  import { router } from '@/routes/routes';

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

  const pages = computed(() => {
    return Array.from({ length: useOperation.totalPages }, (_item, index) => {
      return index;
    });
  });


  watchEffect(async () => {

    if (useOperation.investmentId && useOperation.dates.start && useOperation.dates.end) {

      await getLocalOperationsByDateAndInvestment({
        size: 10,
        start: useOperation.dates.start,
        end: useOperation.dates.end,
        id: useOperation.investmentId,
      });


      if (useOperation.operations.length === 0) {
        alert('Não há operações atreladas a esse investimento nesse período.');
        router.go(0);
      }

    } else if (!useOperation.dates.start && !useOperation.dates.end) {

      if (useOperation.investmentId > 0) {

        await getLocalOperationsByInvestment({ size: 10, id: useOperation.investmentId });
      } else {
        await getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
      }

    } else if (!useOperation.investmentId) {
      await getLocalOperationsByDate({
        size: 10,
        start: useOperation.dates.start,
        end: useOperation.dates.end,
        carteira: Number(route.params.id),
      });

      if (useOperation.operations.length === 0) {
        alert('Não há operações nesse período.');
        router.go(0);
      }
    }
  });

  onMounted(() => {
    getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
    getLocalInvestmentsOnly();
  });

  onUpdated(() => {
    getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
    getLocalInvestmentsOnly();
  });
</script>

<template>
  <Layout sidebar>
    <LayoutCarteira>
      <div v-if="operations.length === 0" class="disclaim">
        <h2>Essa carteira ainda não tem operações...</h2>
        <RouterLink to="/operacao" class="link">Clique aqui para cadastrar!</RouterLink>
      </div>
      <Filters :investments="investments" v-if="operations.length > 0" />
      <Table
        v-if="operations.length > 0"
        :incomes="incomes"
        :operations="operations"
        :investments="investments"
      />
      <Navigation :pages="pages" v-if="pages.length > 1" />
    </LayoutCarteira>
  </Layout>
</template>

<style scoped>
  button {
    background-color: var(--primary);
    font-family: var(--inter);
    font-weight: 700;
    text-transform: uppercase;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
  }

  .disclaim {
    color: #fff;
    margin-bottom: 20px;
  }

  .link {
    color: var(--primary);
  }
</style>
