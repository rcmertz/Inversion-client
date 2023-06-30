<script setup lang="ts">
  import { IInvestment } from '@/interfaces/investment';
  import { useOperation } from '@/stores/operation';
  import { Icon } from '@iconify/vue';
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';

  interface Props {
    investments: IInvestment[];
  }

  const props = defineProps<Props>();

  const route = useRoute();

  // filtra investimentos atrelados à carteira
  const investmentsByWallet = computed(() => {
    return props.investments.filter((item) => {
      return item.carteira.id === Number(route.params.id);
    });
  });

  // zera a página quando os filtros forem alterados
  watch(
    [() => useOperation.investmentId, () => useOperation.dates.start, () => useOperation.dates.end],
    () => {
      useOperation.page = 0;
    }
  );

  // limpa filtros
  function clearValues() {
    useOperation.investmentId = 0;
    useOperation.dates.start = '';
    useOperation.dates.end = '';
  }
</script>

<template>
  <div class="filters">
    <div class="custom-select">
      <label>Filtrar por investimento</label>
      <select class="search-select" v-model="useOperation.investmentId">
        <option :value="0">Todos os investimentos</option>
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
        <button
          type="button"
          @click="clearValues"
          v-if="useOperation.investmentId || useOperation.dates.start || useOperation.dates.end"
        >
          Limpar
        </button>
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
    background-color: var(--dashboard-status-loss);
    height: 62px;
    padding: 0px 42px;
    border-radius: 4px;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: var(--inter);
    cursor: pointer;
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
