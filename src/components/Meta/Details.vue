<script setup lang="ts">
  import { getLocalMeta, getLocalMetaAporte, useMeta } from '@/stores/meta';
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
    aporte.value = { ...useMeta.aporte! };
  });
</script>

<template>
  <div class="details" v-if="aporte && meta">
    <header class="header">
      <div class="card">
        <p>Valor Carteira</p>
        <h1>{{ formatCurrency(meta.carteira.valorCarteira) }}</h1>
      </div>
      <div class="card">
        <p>Meta</p>
        <h1>{{ meta.descricaoMeta }}</h1>
      </div>
      <div class="card">
        <p>Aporte Mensal</p>
        <div style="display: flex; justify-content: space-between">
          <h1>{{ formatCurrency(aporte.aporteMensal) }}</h1>
          <p>{{ aporte.rentabilidade }} %</p>
        </div>
      </div>
      <div class="card">
        <p>Meses restantes</p>
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
  </div>
</template>

<style scoped>
  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 36px;
  }

  .header {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .card {
    width: 20vw;
    height: 17vh;
    border-radius: 20px;
    margin: 10px;
    padding: 30px;
    background-color: #d7dfe9;
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

  @media (max-width: 1400px) {
    form {
      grid-template-columns: repeat(2, 1fr);
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

    .header {
      flex-direction: column;
      width: 100%;
    }

    .card {
      width: 100%;
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
