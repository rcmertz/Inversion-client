<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { Icon } from '@iconify/vue';
  import SectionTitle from '../../SectionTitle.vue';
  import { formatCurrency } from '@/utils/formatCurrency';
  import { deleteLocalIncome, updateLocalIncome, useIncome } from '@/stores/income';
  import { getLocalOperations, useOperation } from '@/stores/operation';
  import { formatDate } from '@/utils/formatDate';
  import { getSingleOperation } from '@/services/operation';
import { router } from '@/routes/routes';

  const form = ref({
    incomeId: 0,
    operacaoId: 0,
    quantidade: 0,
    preco_un: 0,
    data: '',
    cadastro: '',
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
    return formatCurrency(form.value.quantidade * form.value.preco_un);
  });

  const operations = computed(() => {
    return useOperation.operations.filter((item) => item.ativo && item.investimento.ativo);
  });

  const incomes = computed(() => {
    return useIncome.incomes.filter((item) => {
      return item.operacao.id === form.value.operacaoId;
    });
  });

  const selectedIncome = computed(() => {
    return incomes.value.find((item) => {
      return item.id === form.value.incomeId;
    });
  });

  const selectedOperation = computed(() => {
    return operations.value.find((item) => {
      return item.id === form.value.operacaoId;
    });
  });

  const selectedWallet = computed(() => {
    return operations.value.find((item) => {
      return (
        item.investimento.carteira.descricaoCarteira ===
        selectedOperation.value?.investimento.carteira.descricaoCarteira
      );
    });
  });

  const walletName = computed(() => {
    return selectedWallet.value?.investimento.carteira.descricaoCarteira;
  });

  watch(selectedIncome, async (value) => {
    form.value.quantidade = value!.quantidade;
    form.value.preco_un = value!.preco_un;
    form.value.data = value!.data;
    form.value.cadastro = value!.cadastro;
  });

  async function handleSubmit() {
    const formData = {
      ...form.value,
      id: form.value.incomeId,
      operacao: {
        ...form.value.operacao,
        id: form.value.operacaoId,
        ativo: true,
      },
    };

    await updateLocalIncome(form.value.incomeId, formData);
  }

  async function handleDeletion() {
    const formData = {
      ...form.value,
      id: form.value.incomeId,
      operacao: {
        ...form.value.operacao,
        id: form.value.operacaoId,
        ativo: true,
      },
    };

    const message = confirm('Deseja remover esse rendimento?');
    if (message) {
      await deleteLocalIncome(form.value.incomeId, { ...formData, ativo: false });
      router.push('/carteiras');
    }
  }

  onMounted(async () => {
    await getLocalOperations();
    await getSingleOperation(form.value.operacaoId);
  });
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Editar rendimento" />
    </header>

    <!-- Operação -->
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

    <!-- Rendimento -->
    <div class="form-row">
      <label for="rendimento">Rendimento</label>
      <div class="custom-select">
        <select name="rendimento" id="rendimento" required v-model="form.incomeId">
          <option disabled value="0" class="placeholder">Selecione um rendimento</option>
          <option v-if="incomes.length > 0" v-for="item in incomes" :value="item.id">
            {{ formatCurrency(item.quantidade * item.preco_un) }} - {{ formatDate(item.data) }} -
            {{ item.id }}
          </option>
          <option disabled value="0" v-else>0 rendimentos cadastrados</option>
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
        v-model="walletName"
      />
    </div>

    <div class="buttons">
      <button type="button" @click="handleDeletion">Deletar</button>
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

  .buttons > button:first-child {
    background-color: var(--dashboard-status-loss);
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
