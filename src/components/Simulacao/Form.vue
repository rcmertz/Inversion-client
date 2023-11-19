<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import SectionTitle from '../SectionTitle.vue';
  import { formatCurrency } from '@/utils/formatCurrency';
  import Chart from './Chart.vue';

  const initialState = {
    valor: 0,
    aporte: 0,
    taxa: 0,
    data: '',
    periodo: 0,
  };

  // valores enviados ao backend
  const form = reactive({ ...initialState });
  const amount = ref<number[]>([]);
  const amountWithInterest = ref<number[]>([]);

  const result = ref(false);

  const totalInvested = computed(() => {
    return form.valor + form.aporte * form.periodo;
  });

  const totalFinal = computed(() => {
    const taxaMensal = form.taxa / 100;
    const meses = form.periodo;

    const total = form.valor * Math.pow(1 + taxaMensal, meses);

    const montanteComAportes = form.aporte * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);

    return total + montanteComAportes;
  });

  const monthlyAmount = computed(() => {
    const meses = form.periodo;

    let montanteAcumulado = form.valor;

    for (let i = 0; i < meses; i++) {
      montanteAcumulado += form.aporte;
      amount.value.push(montanteAcumulado);
    }

    return amount;
  });

  const monthlyAmountWithInterest = computed(() => {
    const taxaMensal = form.taxa / 100;
    const meses = form.periodo;

    let montanteAcumulado = form.valor;

    for (let i = 0; i < meses; i++) {
      montanteAcumulado = montanteAcumulado * (1 + taxaMensal) + form.aporte;
      amountWithInterest.value.push(montanteAcumulado);
    }

    return amountWithInterest;
  });

  function calculateSimulation() {
    result.value = true;
  }

  function clearSimulation() {
    Object.assign(form, initialState);
    result.value = false;
  }

  function getFinalDate() {
    const date = new Date();
    const month = date.getMonth();
    const addMonth = date.setMonth(month + form.periodo);

    const newDate = new Date(addMonth);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    const newDay = newDate.getDate();

    return `${newYear}-${newMonth + 1 >= 10 ? newMonth + 1 : '0' + Number(newMonth + 1)}-${newDay}`;
  }
</script>

<template>
  <form @submit.prevent="calculateSimulation" v-if="!result">
    <header>
      <SectionTitle title="Simulação de investimento" />
    </header>

    <div class="form-row">
      <label for="valor">Valor Inicial</label>
      <input
        type="number"
        name="valor"
        id="valor"
        placeholder="R$ 25.888,86"
        required
        v-model="form.valor"
        min="1"
        step="0.01"
      />
    </div>
    <div class="form-row">
      <label for="aporte">Aporte Mensal</label>
      <input
        type="number"
        name="aporte"
        id="aporte"
        placeholder="R$ 1000,00"
        min="1"
        step="0.01"
        required
        v-model="form.aporte"
      />
    </div>
    <div class="form-row">
      <label for="taxa">Taxa de juros mensal %</label>
      <input
        type="number"
        name="taxa"
        id="taxa"
        placeholder="2.2%"
        required
        v-model="form.taxa"
        step="0.01"
        min="0.01"
      />
    </div>
    <div class="form-row">
      <label for="periodo">Período (em meses)</label>
      <input
        type="number"
        name="periodo"
        id="periodo"
        placeholder="28"
        min="1"
        required
        v-model.number="form.periodo"
        @input="form.data = getFinalDate()"
      />
    </div>
    <div class="form-row">
      <label for="data">Data Final</label>
      <input
        type="date"
        name="data"
        id="data"
        placeholder="dd/mm/aaaa"
        v-model="form.data"
        readonly
      />
    </div>
    <div class="buttons">
      <button type="button" @click="form = initialState">Limpar</button>
      <button type="submit">Calcular</button>
    </div>
  </form>
  <form @submit="clearSimulation" v-else>
    <header>
      <SectionTitle title="Simulação de investimento" />
    </header>

    <div class="form-row">
      <label for="valorTotal">Valor Total Final</label>
      <input type="text" name="valorTotal" :value="formatCurrency(totalFinal)" disabled />
    </div>
    <div class="form-row">
      <label for="totalInvestido">Valor Total Investido</label>
      <input type="text" name="totalInvestido" :value="formatCurrency(totalInvested)" disabled />
    </div>
    <div class="form-row">
      <label for="jurosTotal">Total em Juros</label>
      <input
        type="text"
        name="jurosTotal"
        :value="formatCurrency(totalFinal - totalInvested)"
        disabled
      />
    </div>
    <div class="form-row">
      <label for="data">Data Final</label>
      <input type="date" name="data" v-model="form.data" disabled />
    </div>
    <div class="buttons">
      <button type="submit">Voltar</button>
    </div>
    <Chart
      :monthly-amount="monthlyAmount.value"
      :monthly-amount-with-interest="monthlyAmountWithInterest.value"
      :months="form.periodo"
      :total-final="totalFinal"
      :total-invested="totalInvested"
    />
  </form>
</template>

<style scoped>
  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    background-color: #fff;
    padding: 36px;
  }

  header {
    margin-bottom: 20px;
    grid-column: span 3 / span 3;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    min-width: 0px;
  }

  label {
    font-family: var(--inter);
    font-size: 20px;
    font-weight: 600;
  }

  .custom-select {
    display: flex;
    position: relative;
    height: 77px;
  }

  .custom-select select {
    border: none;
    outline: none;
    appearance: none;
    padding: 24px;
    background-color: var(--input);
    font-size: 24px;
    font-family: var(--montserrat);
    font-weight: 500;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 40%);
    border-radius: 4px;
  }

  .select-icon {
    font-size: 32px;
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
  }

  input {
    border-radius: 4px;
    padding: 24px;
    background-color: var(--input);
    font-size: 24px;
    font-family: var(--montserrat);
    font-weight: 500;
    color: rgba(0, 0, 0, 40%);
  }

  input:disabled {
    background-color: #c1c1c2;
    color: rgba(0, 0, 0, 40%);
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 40px;
    grid-column: span 3 / span 3;
    place-self: flex-end;
  }

  .buttons :nth-child(1) {
    background-color: var(--dashboard-status-loss);
  }

  .buttons > * {
    background-color: var(--primary-alt);
    font-family: var(--inter);
    font-weight: 600;
    font-size: 25px;
    text-transform: uppercase;
    border-radius: 8px;
    padding: 22px 42px;
    text-decoration: none;
    color: unset;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 1400px) {
    form {
      grid-template-columns: repeat(2, 1fr);
    }

    header {
      grid-column: span 2 / span 2;
    }

    .buttons {
      grid-column: span 2 / span 2;
    }
  }

  @media (max-width: 1100px) {
    form {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 750px) {
    .buttons {
      flex-direction: column;
      width: 100%;
      padding-top: 0px;
    }

    .buttons > * {
      width: 100%;
      display: grid;
      place-items: center;
    }
  }
</style>
