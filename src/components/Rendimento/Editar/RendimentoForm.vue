<script setup lang="ts">
  import { reactive, computed, onMounted } from 'vue';
  import { Icon } from '@iconify/vue';
  import SectionTitle from '../../SectionTitle.vue';
  import { formatCurrency } from '@/utils/formatCurrency';
  import { getLocalInvestments, investmentStore } from '@/stores/investment';
  import { getLocalWallets } from '@/stores/wallet';
  import { updateLocalIncome } from '@/stores/income';

  const form = reactive({
    descricao: '',
    quantidade: 0,
    preco_un: 0,
    data: '',
    ativo: true,
  });

  const valorFinal = computed(() => {
    return formatCurrency(form.quantidade * form.preco_un);
  });

  const investments = computed(() => {
    return investmentStore.investments.filter((item) => item.ativo);
  });

  const selectedInvestment = computed(() => {
    return investments.value.find((item) => item.tipo === form.descricao);
  });

  async function handleSubmit() {
    await updateLocalIncome(1, form);
  }

  const selectedWallet = computed(() => {
    return investments.value
      .find(
        (item) =>
          item.carteira.descricaoCarteira === selectedInvestment.value?.carteira.descricaoCarteira
      )
      ?.carteira.descricaoCarteira.toUpperCase();
  });

  onMounted(() => {
    getLocalInvestments();
    getLocalWallets();
  });
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Editar rendimento" />
    </header>

    <!-- Investimento -->
    <div class="form-row">
      <label for="descricao">Investimento</label>
      <div class="custom-select">
        <select name="descricao" id="descricao" v-model="form.descricao" required>
          <option disabled value="" class="placeholder">Selecione um investimento</option>
          <option v-if="investments.length > 0" v-for="item in investments">
            {{ item.tipo }}
          </option>
          <option disabled value="" v-else>0 investimentos cadastrados</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <!-- Quantidade -->
    <div class="form-row">
      <label for="quantidade">Quantidade</label>
      <input
        type="number"
        name="quantidade"
        id="quantidade"
        min="0"
        v-model="form.quantidade"
        required
      />
    </div>

    <!-- Valor UN -->
    <div class="form-row">
      <label for="preco_un">Valor UN</label>
      <p class="currency">R$</p>
      <input
        type="number"
        name="preco_un"
        id="preco_un"
        min="0"
        step="0.01"
        v-model="form.preco_un"
        class="valor-unitario"
        required
      />
    </div>

    <!-- Valor Total -->
    <div class="form-row">
      <label for="valor_total">Valor Total</label>
      <input
        type="text"
        name="valor_total"
        id="valor_total"
        v-model="valorFinal"
        readonly
        required
      />
    </div>

    <!-- Data -->
    <div class="form-row">
      <label for="data">Data</label>
      <input
        type="date"
        name="data"
        id="data"
        v-model="form.data"
        placeholder="dd/mm/aaaa"
        required
      />
    </div>

    <!-- Carteira -->
    <div class="form-row">
      <label for="carteira">Carteira</label>
      <input
        type="text"
        id="data"
        placeholder="SELECIONE UM INVESTIMENTO"
        v-model="selectedWallet"
        readonly
      />
    </div>

    <div class="buttons">
      <RouterLink :to="'/investimento/editar-investimento/' + $route.params.id">Investimento</RouterLink>
      <button type="submit">Confirmar</button>
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
  }

  label {
    font-family: var(--inter);
    font-size: 24px;
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
    grid-column: 1 / -1;

    gap: 40px;
  }

  .buttons > * {
    background-color: var(--primary-alt);
    font-family: var(--inter);
    font-weight: 600;
    font-size: 30px;
    text-transform: uppercase;
    border-radius: 8px;
    padding: 22px 42px;
    text-decoration: none;
    color: unset;
    cursor: pointer;
  }

  @media (max-width: 1400px) {
    form {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
