<script setup lang="ts">
import { getLocalMeta, getLocalMetaAporte, updateLocalMeta, useMeta } from '@/stores/meta';
import { computed, nextTick, onMounted, ref } from 'vue';
import { getLocalWallets, useWallet } from '@/stores/wallet';
import { useRoute } from 'vue-router';
import Chart from '@/components/Dashboard/Chart.vue';

// valores enviados ao backend
const form = ref({
  descricaoMeta: "",
  valorMeta: 0,
  rentabilidade: 0,
  ativo: true,
  dataMeta: "",
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
  aporteMensal: 0
})

const route = useRoute();

// pega investimentos quando o componente renderizar
onMounted(() => {
  getLocalMeta(Number(route.params.id));
  getLocalMetaAporte(Number(route.params.id));
  getLocalWallets();
  form.value = { ...useMeta.meta! };
  aporte.value = { ...useMeta.aporte! };
});
</script>

<template>
    <div class="form">
      <header class="header">
        <div class="card">
          <p>Meta</p>
          <h1>{{form.descricaoMeta}}</h1>
        </div>
        <div class="card">
          <p>Aporte Mensal</p>
          <div style="display: flex; justify-content: space-between;">
            <h1>R$ {{ aporte.aporteMensal }}</h1>
            <p>{{ aporte.rentabilidade }} %</p>
          </div>
        </div>
        <div class="card">
          <p>Meses restantes</p>
          <h1>{{ aporte.dataRestante}} meses</h1>
        </div>
      </header>

      <div style="width: 60vw;">
        <Chart
        :valor-realizado="aporte.valorRealizado"
        :valor-meta="aporte.valorMeta"
        :is-meta="true"
        />
      </div>


      <div class="buttons">
        <RouterLink to="/metas">Voltar</RouterLink>
      </div>

    </div>
</template>

<style scoped>
.form {
  display: flex;
  height: 85vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 36px;
}

.header {
  display: flex;
  justify-content: center;
}

.card{
  width: 20vw;
  height: 17vh;
  border-radius: 20px;
  margin: 10px;
  padding: 30px;
  background-color: #d7dfe9;
}

/* Add media query for smaller screens */
@media (max-width: 1400px) {
  form {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-row:nth-child(2)>.custom-select {
    width: 100%;
    /* Adjust width for smaller screens */
  }

  .buttons {
    grid-column: span 2 / span 2;
  }
}

/* Add media query for even smaller screens */
@media (max-width: 768px) {
  form {
    grid-template-columns: 1fr;
    /* Switch to a single column for smaller screens */
  }
}

header {
  margin-bottom: 20px;
  grid-column: 1 / -1;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-column: span 1 / span 1;
  position: relative;
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
}

.buttons {
  display: flex;
  align-items: center;
  place-self: flex-end;
  grid-column: span 2 / span 2;
  gap: 40px;
}

.buttons>* {
  background-color: #FF3030;
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

.form-row:nth-child(2)>.custom-select {
  width: 452px;
}

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

@media (max-width: 1400px) {
  form {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
registerLocalOperation, 