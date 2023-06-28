<script setup lang="ts">
  import { reactive, computed, onMounted } from 'vue';
  import { Icon } from '@iconify/vue';
  import SectionTitle from '../../SectionTitle.vue';
  import { formatCurrency } from '@/utils/formatCurrency';
  import { registerLocalIncome } from '@/stores/income';
  import { getLocalOperations, useOperation } from '@/stores/operation';
  import { formatDate } from '@/utils/formatDate';
  import { getLocalWallets } from '@/stores/wallet';

  const form = reactive({
    operacaoId: 0,
    quantidade: 0,
    preco_un: 0,
    data: '',
    ativo: true,
    operacao: {
      ativo: true,
      investimento: {
        ativo: true,
        nomeInvestimento: '',
      },
    },
  });

  const valorFinal = computed(() => {
    return formatCurrency(form.quantidade * form.preco_un);
  });

  const operations = computed(() => {
    return useOperation.operations.filter((item) => item.ativo && item.investimento.ativo);
  });

  const selectedOperation = computed(() => {
    return operations.value.find((item) => {
      return item.id === form.operacaoId;
    });
  });

  const selectedWallet = computed(() => {
    return operations.value.find((item) => {
      return (
        item.investimento.carteira?.descricaoCarteira ===
        selectedOperation.value?.investimento.carteira?.descricaoCarteira
      );
    })?.investimento.carteira?.descricaoCarteira;
  });

  async function handleSubmit() {
    const formData = {
      ...form,
      operacao: {
        ...form.operacao,
        id: form.operacaoId,
      },
    };

    await registerLocalIncome(formData);
  }

  onMounted(() => {
    getLocalWallets();
    getLocalOperations();
  });
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Cadastro de rendimento" />
    </header>

    <!-- Investimento -->
    <div class="form-row">
      <label for="descricao">Operação</label>
      <div class="custom-select">
        <select name="descricao" id="descricao" required v-model="form.operacaoId">
          <option disabled value="0" class="placeholder">Selecione uma operação</option>
          <option v-if="operations.length > 0" v-for="item in operations" :value="item.id">
            {{ item.investimento.nomeInvestimento }} - {{ formatDate(item.data) }} - {{ item.tipo }}
          </option>
          <option disabled value="0" v-else>0 investimentos cadastrados</option>
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
        type="datetime-local"
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
        id="carteira"
        name="carteira"
        placeholder="SELECIONE UMA OPERAÇÃO"
        readonly
        v-model="selectedWallet"
      />
    </div>

    <div class="buttons">
      <RouterLink to="/operacao">Operação</RouterLink>
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
    border: none;
  }

  @media (max-width: 1400px) {
    form {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
