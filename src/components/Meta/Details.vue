<script setup lang="ts">
  import { getLocalMeta, getLocalMetaAporte, useMeta } from '@/stores/meta';
<<<<<<< HEAD
  import { computed, onMounted, ref } from 'vue';
  import { getLocalWallets } from '@/stores/wallet';
  import { useRoute } from 'vue-router';
  import Chart from './Chart.vue';
  import { formatCurrency } from '@/utils/formatCurrency';
import { IMeta } from '@/interfaces/meta';
import { IAporte } from '@/interfaces/aporte';

  const meta = ref<IMeta | null>(null);

  const aporte = ref<IAporte | null>(null);

  const amount = ref<number[]>([]);
  const fulfillAmount = ref<number[]>([]);

  const monthlyFulfilled = computed(() => {
    const meses = aporte.value?.dataRestante!;

    let montanteAcumulado = meta.value?.carteira.valorCarteira!;

    for (let i = 0; i < meses; i++) {
      montanteAcumulado =
        montanteAcumulado * (1 + meta.value?.rentabilidade! / 100) + aporte.value?.aporteMensal!;

      if (montanteAcumulado > meta.value?.valorMeta!) {
        montanteAcumulado = meta.value?.valorMeta!;
      }

      fulfillAmount.value.push(montanteAcumulado);
    }

    return fulfillAmount.value;
  });

  const monthlyMeta = computed(() => {
    const meses = aporte.value?.dataRestante!;

    let montanteAcumulado = meta.value?.carteira.valorCarteira!;

    for (let i = 0; i < meses; i++) {
      montanteAcumulado += aporte.value?.aporteMensal!;
      amount.value.push(montanteAcumulado);
    }

    return amount.value;
  });

  const route = useRoute();

  // pega metas quando o componente renderizar
  onMounted(async () => {
    await getLocalMeta(Number(route.params.id));
    await getLocalMetaAporte(Number(route.params.id));
    await getLocalWallets();
    meta.value = { ...useMeta.meta! };
=======
  import { onMounted, ref } from 'vue';
  import { getLocalWallets } from '@/stores/wallet';
  import { useRoute } from 'vue-router';
  import Chart from '@/components/Dashboard/Chart.vue';

  // valores enviados ao backend
  const form = ref({
    descricaoMeta: '',
    valorMeta: 0,
    rentabilidade: 0,
    ativo: true,
    dataMeta: '',
    carteira: {
      id: 0,
      ativo: true,
    },
  });

  const aporte = ref({
    valorRealizado: 0,
    rentabilidade: 0,
    dataRestante: 0,
    valorMeta: 0,
    aporteMensal: 0,
  });

  const route = useRoute();

  // pega investimentos quando o componente renderizar
  onMounted(() => {
    getLocalMeta(Number(route.params.id));
    getLocalMetaAporte(Number(route.params.id));
    getLocalWallets();
    form.value = { ...useMeta.meta! };
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
    aporte.value = { ...useMeta.aporte! };
  });
</script>

<template>
<<<<<<< HEAD
  <div class="details" v-if="aporte && meta">
    <header class="header">
      <div class="card">
        <p>Valor Carteira</p>
        <h1>{{ formatCurrency(meta.carteira.valorCarteira) }}</h1>
      </div>
      <div class="card">
        <p>Meta</p>
        <h1>{{ meta.descricaoMeta }}</h1>
=======
  <div class="form">
    <header class="header">
      <div class="card">
        <p>Meta</p>
        <h1>{{ form.descricaoMeta }}</h1>
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
      </div>
      <div class="card">
        <p>Aporte Mensal</p>
        <div style="display: flex; justify-content: space-between">
<<<<<<< HEAD
          <h1>{{ formatCurrency(aporte.aporteMensal) }}</h1>
=======
          <h1>R$ {{ aporte.aporteMensal }}</h1>
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
          <p>{{ aporte.rentabilidade }} %</p>
        </div>
      </div>
      <div class="card">
        <p>Meses restantes</p>
<<<<<<< HEAD
        <h1>{{ aporte.dataRestante }} {{ aporte.dataRestante !== 1 ? 'meses' : 'mês' }}</h1>
      </div>
    </header>

    <Chart
      :valor-realizado="aporte.valorRealizado"
      :valor-meta="aporte.valorMeta"
      :monthly-meta="monthlyMeta"
      :months="aporte.dataRestante"
      :monthly-fulfilled="monthlyFulfilled"
    />

    <div class="buttons">
      <RouterLink to="/metas">Voltar</RouterLink>
    </div>
=======
        <h1>{{ aporte.dataRestante }} meses</h1>
      </div>
    </header>

    <div style="width: 60vw">
      <Chart
        :valor-realizado="aporte.valorRealizado"
        :valor-meta="aporte.valorMeta"
        :is-meta="true"
      />
    </div>

    <div class="buttons">
      <RouterLink to="/metas">Voltar</RouterLink>
    </div>
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
  </div>
</template>

<style scoped>
<<<<<<< HEAD
  .details {
    display: flex;
=======
  .form {
    display: flex;
    height: 85vh;
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 36px;
  }

  .header {
    display: flex;
    justify-content: center;
<<<<<<< HEAD
    margin-bottom: 40px;
=======
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
  }

  .card {
    width: 20vw;
    height: 17vh;
    border-radius: 20px;
    margin: 10px;
    padding: 30px;
    background-color: #d7dfe9;
<<<<<<< HEAD
=======
  }

  header {
    margin-bottom: 20px;
    grid-column: 1 / -1;
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

  .valor-unitario {
    padding-left: 64px;
  }

  .currency {
    position: absolute;
    top: 54%;
    left: 24px;
    font-size: 24px;
    font-family: var(--montserrat);
    font-weight: 500;
    color: rgba(0, 0, 0, 40%);
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 40px;
    grid-column: span 3 / span 3;
    place-self: flex-end;
  }

  .buttons > * {
    background-color: #ff3030;
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

<<<<<<< HEAD
=======
  .modal-btn {
    background-color: var(--primary-alt);
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 12px -2px rgba(0, 0, 0, 25%);
    position: absolute;
    right: -56px;
    top: 50%;
    transform: translateY(-50%);
  }

  .modal-icon {
    font-size: 20px;
  }

>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
  @media (max-width: 1400px) {
    form {
      grid-template-columns: repeat(2, 1fr);
    }
<<<<<<< HEAD

    .buttons {
      grid-column: span 2 / span 2;
    }
=======
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
  }

  @media (max-width: 1100px) {
    form {
      display: flex;
      flex-direction: column;
    }
<<<<<<< HEAD

    .header {
      flex-direction: column;
      width: 100%;
    }

    .card {
      width: 100%;
    }
=======
>>>>>>> c56624377d8da6e996bb89c8129f91a569e63e6d
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
