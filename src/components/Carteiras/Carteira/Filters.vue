<script setup lang="ts">
  import { IInvestment } from '@/interfaces/investment';
  import { router } from '@/routes/routes';
  import { getLocalInvestments } from '@/stores/investment';
  import {
    getLocalOperationsByDate,
    getLocalOperationsByDateAndInvestment,
    getLocalOperationsByInvestment,
    getLocalOperationsByWallet,
    useOperation,
  } from '@/stores/operation';
  import { Icon } from '@iconify/vue';
  import { computed, watch, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  interface Props {
    investments: IInvestment[];
  }

  const props = defineProps<Props>();

  const route = useRoute();

  const investmentsByWallet = computed(() => {
    return props.investments.filter((item) => {
      return item.carteira.id === Number(route.params.id);
    });
  });

  watch(
    [() => useOperation.investmentId, () => useOperation.dates.start, () => useOperation.dates.end],
    () => {
      useOperation.page = 0;
    }
  );

  watchEffect(async () => {
    if (
      useOperation.investmentId > 0 &&
      useOperation.dates.start !== '' &&
      useOperation.dates.end !== ''
    ) {
      await getLocalOperationsByDateAndInvestment({
        size: 10,
        end: useOperation.dates.end,
        start: useOperation.dates.start,
        id: useOperation.investmentId,
      });

      if (useOperation.operations.length === 0) {
        alert('Não existem operações nesse período.');
        router.go(0);
        return;
      }
    } else if (useOperation.dates.start !== '' && useOperation.dates.end !== '') {
      await getLocalOperationsByDate({
        size: 10,
        end: useOperation.dates.end,
        start: useOperation.dates.start,
        carteira: Number(route.params.id),
      });

      if (useOperation.operations.length === 0) {
        alert('Não existem operações nesse período.');
        router.go(0);
        return;
      }
    } else if (
      useOperation.investmentId === 0 &&
      useOperation.dates.start !== '' &&
      useOperation.dates.end !== ''
    ) {
      await getLocalOperationsByDate({
        size: 10,
        end: useOperation.dates.end,
        start: useOperation.dates.start,
        carteira: Number(route.params.id),
      });

      if (useOperation.operations.length === 0) {
        alert('Não existem operações nesse período.');
        router.go(0);
        return;
      }
    } else if (useOperation.investmentId > 0) {
      if (useOperation.dates.start !== '' && useOperation.dates.end !== '') {
        await getLocalOperationsByDateAndInvestment({
          size: 10,
          end: useOperation.dates.end,
          start: useOperation.dates.start,
          id: useOperation.investmentId,
        });
      } else {
        await getLocalOperationsByInvestment({ size: 10, id: useOperation.investmentId });
      }

      if (useOperation.operations.length === 0) {
        alert('Não existem operações nesse período.');
        router.go(0);
        return;
      }
    } else {
      await getLocalInvestments();
      await getLocalOperationsByWallet({ size: 10, carteira: Number(route.params.id) });
    }
  });
</script>

<template>
  <div class="filters">
    <div class="custom-select">
      <label>Filtrar por investimento</label>
      <select class="search-select" v-model="useOperation.investmentId">
        <option value="0">Todos os investimentos</option>
        <option v-for="item in investmentsByWallet" :value="item.id">
          {{ item.nomeInvestimento }}
        </option>
      </select>
      <Icon icon="icon-park-outline:down" class="select-icon" />
    </div>
    <div class="dates-container">
      <label>Filtrar por data</label>
      <div class="dates">
        <input type="datetime-local" name="dataStart" v-model="useOperation.dates.start" />
        <input type="datetime-local" name="dataEnd" v-model="useOperation.dates.end" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .filters {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 20px;
  }

  .dates-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50vw;
    min-width: 500px;
  }

  label {
    background-color: var(--background);
    color: #acacac;
    font-family: var(--inter);
    font-weight: 600;
    font-size: 20px;
  }

  .dates {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  input {
    padding: 8px 16px;
    background-color: var(--input);
    font-size: 24px;
    font-family: var(--montserrat);
    font-weight: 500;
    text-transform: uppercase;
    width: 100%;
    height: 62px;
    color: rgba(0, 0, 0, 40%);
    border-radius: 4px;
    min-width: 300px;
  }

  button {
    background-color: var(--primary);
    height: 62px;
    padding: 0px 42px;
    border-radius: 4px;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: var(--inter);
    cursor: pointer;
  }

  button:disabled {
    opacity: 80%;
    cursor: not-allowed;
  }

  .custom-select {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    width: 25vw;
    min-width: 500px;
  }

  label {
    background-color: var(--background);
    color: #acacac;
    font-family: var(--inter);
    font-weight: 600;
    font-size: 20px;
  }

  .custom-select select {
    border: none;
    outline: none;
    appearance: none;
    padding: 8px 16px;
    background-color: var(--input);
    font-size: 24px;
    font-family: var(--montserrat);
    font-weight: 500;
    text-transform: uppercase;
    width: 100%;
    height: 62px;
    color: rgba(0, 0, 0, 40%);
    border-radius: 4px;
  }

  .select-icon {
    font-size: 32px;
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(calc(-50% + 19px));
  }
</style>
