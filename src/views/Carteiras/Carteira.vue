<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import LayoutCarteira from '@/components/Carteiras/Layout.vue';
  import Table from '@/components/Carteiras/Carteira/Table.vue';
  import { computed, onMounted, onUpdated } from 'vue';
  import { useRoute } from 'vue-router';
  import { getLocalOperationsByWallet, useOperation } from '@/stores/operation';
  import { getLocalInvestments, useInvestment } from '@/stores/investment';
  import { useIncome } from '@/stores/income';
  import Navigation from '@/components/Carteiras/Carteira/Navigation.vue';
  import Filters from '@/components/Carteiras/Carteira/Filters.vue';

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

  onMounted(() => {
    getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
    getLocalInvestments();
  });

  onUpdated(() => {
    getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
    getLocalInvestments();
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
      <Navigation v-if="operations.length > 0" />
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
