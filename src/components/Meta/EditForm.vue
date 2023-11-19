<script setup lang="ts">
  import SectionTitle from '../SectionTitle.vue';
  import { getLocalMeta, updateLocalMeta, useMeta } from '@/stores/meta';
  import { computed, nextTick, onMounted, ref } from 'vue';
  import { getLocalWallets, useWallet } from '@/stores/wallet';
  import { useRoute } from 'vue-router';
  import { formatCurrency } from '@/utils/formatCurrency';

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

  // filtra carteiras ativos
  const wallets = computed(() => {
    return useWallet.wallets?.filter((item) => item.ativo);
  });

  const selectedWallet = computed(() => {
    return wallets.value.find((item) => item.id === form.value.carteira.id);
  });

  const selectedWalletDate = computed(() => {
    const date = new Date(selectedWallet.value?.cadastro as string);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}-${month + 1}-${day}`;
  });

  async function handleSubmit() {
    await nextTick();

    const formData = {
      ...form.value,
      carteira: {
        ...form.value.carteira,
        id: selectedWallet.value?.id,
      },
    };

    await updateLocalMeta(Number(route.params.id), formData);
  }

  const route = useRoute();

  // pega investimentos quando o componente renderizar
  onMounted(async () => {
    await getLocalMeta(Number(route.params.id));
    await getLocalWallets();
    form.value = { ...useMeta.meta! };
  });
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Edição de meta" />
    </header>

    <!-- Data -->
    <div class="form-row">
      <label for="dataMeta">Data</label>
      <input
        type="date"
        name="dataMeta"
        id="dataMeta"
        placeholder="dd/mm/aaaa"
        required
        v-model="form.dataMeta"
      />
    </div>

    <!-- Descrição -->
    <div class="form-row">
      <label for="descricaoMeta">Descrição</label>
      <input
        type="text"
        name="descricaoMeta"
        id="descricaoMeta"
        required
        v-model="form.descricaoMeta"
      />
    </div>

    <!-- Valor -->
    <div class="form-row">
      <label for="valorMeta">Valor</label>
      <p class="currency">R$</p>
      <input
        type="number"
        name="dataMeta"
        id="dataMeta"
        step="0.01"
        class="valor-unitario"
        required
        v-model="form.valorMeta"
      />
    </div>

    <!-- Rentabilidade -->
    <div class="form-row">
      <p class="currency">R$</p>
      <label for="rentabilidade">Rentabilidade</label>
      <input
        type="text"
        name="rentabilidade"
        id="rentabilidade"
        required
        class="valor-unitario"
        v-model="form.rentabilidade"
        step="0.01"
      />
    </div>
    <!-- Carteira -->
    <div class="form-row">
      <label for="investimento">Carteira</label>
      <div class="custom-select">
        <select name="investimento" id="carteira" required v-model="form.carteira.id">
          <option disabled value="0" class="placeholder">Selecione uma carteira</option>
          <option v-if="wallets.length > 0" v-for="item in wallets" :value="item.id">
            {{ item.descricaoCarteira }}
          </option>
          <option v-else disabled value="0">0 carteiras cadastradas</option>
        </select>
      </div>
    </div>
    <!-- Valor carteira -->
    <div class="form-row" v-if="selectedWallet">
      <label for="valorCarteira">Valor Carteira</label>
      <input
        type="text"
        name="valorCarteira"
        :value="formatCurrency(selectedWallet.valorCarteira)"
        readonly
      />
    </div>
    <div class="form-row" v-if="selectedWallet">
      <label for="dataCarteira">Data da Carteira</label>
      <input type="date" name="dataCarteira" :value="selectedWalletDate" readonly />
    </div>

    <div class="buttons">
      <RouterLink to="/metas">Cancelar</RouterLink>
      <RouterLink to="/metas" type="submit" @click="handleSubmit()">Confirmar</RouterLink>
    </div>
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
    top: 51.5%;
    left: 24px;
    font-size: 24px;
    font-family: var(--montserrat);
    font-weight: 500;
    color: rgba(0, 0, 0, 40%);
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 40px;
    grid-column: span 3 / span 3;
    place-self: flex-end;
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
