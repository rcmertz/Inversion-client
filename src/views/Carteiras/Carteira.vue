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

  // filtra operações ativas, atreladas a investimentos ativos
  const operations = computed(() => {
    return useOperation.operations?.filter((item) => {
      return (
        item.ativo &&
        item.investimento.ativo &&
        item.investimento.carteira?.id === Number(route.params.id)
      );
    });
  });

  // filtra rendimentos ativos
  const incomes = computed(() => {
    return useIncome.incomes.filter((item) => item.ativo);
  });

  // filtra investimentos ativos
  const investments = computed(() => {
    return useInvestment.investments.filter((item) => item.ativo);
  });

  // páginas
  const pages = computed(() => {
    return Array.from({ length: useOperation.totalPages }, (_item, index) => {
      return index;
    });
  });

  // espera pela mudança de valor de alguma das propriedades no callback e executa alguma função
  watchEffect(async () => {
    // se todos os valores de filtro estiverem preenchidos
    if (useOperation.investmentId && useOperation.dates.start && useOperation.dates.end) {
      // filtra operações por data e investimento
      await getLocalOperationsByDateAndInvestment({
        size: 10,
        start: useOperation.dates.start,
        end: useOperation.dates.end,
        id: useOperation.investmentId,
      });

      // se não retornar nada, estoura alert abaixo
      if (useOperation.operations.length === 0) {
        alert('Não há operações atreladas a esse investimento nesse período.');
        router.go(0);
      }

      // se filtros data não estiverem preenchidos verifica
    } else if (!useOperation.dates.start && !useOperation.dates.end) {
      // se investimento está selecionado
      if (useOperation.investmentId > 0) {
        // filtra operações por investimento
        await getLocalOperationsByInvestment({ size: 10, id: useOperation.investmentId });
      } else {
        // filtra operações por carteira
        await getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
      }

      // verifica se investimento não está selecionado
    } else if (!useOperation.investmentId) {
      // filtra operações por data
      await getLocalOperationsByDate({
        size: 10,
        start: useOperation.dates.start,
        end: useOperation.dates.end,
        carteira: Number(route.params.id),
      });

      // se não retornar nada, estoura alert abaixo
      if (useOperation.operations.length === 0) {
        alert('Não há operações nesse período.');
        router.go(0);
      }
    }
  });

  // filtra operações por carteira e pega investimentos quando
  // o componente renderizar
  onMounted(() => {
    getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
    getLocalInvestmentsOnly();
  });

  // filtra operações por carteira e pega investimentos quando
  // o componente atualizar
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
