<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import SectionTitle from '../SectionTitle.vue';
  import { registerLocalOperation, useOperation } from '@/stores/operation';
  import { useInvestment } from '@/stores/investment';
  import { computed, onMounted, reactive } from 'vue';
  import { getLocalInvestments } from '@/stores/investment';
  import { formatCurrency } from '@/utils/formatCurrency';

  // valores enviados ao backend
  const form = reactive({
    valor: 0,
    quantidade: 0,
    tipo: '',
    ativo: true,
    data: '',
    investimento: {
      id: 0,
      ativo: true,
      nomeInvestimento: '',
    },
  });

  // calcula valor final e faz máscara no input
  const valorFinal = computed(() => {
    return formatCurrency(form.quantidade * form.valor);
  });

  // filtra investimentos ativos atrelados à carteiras ativas
  const investments = computed(() => {
    return useInvestment.investments.filter((item) => item.ativo && item.carteira.ativo);
  });

  // investimento selecionado
  const selectedInvestment = computed(() => {
    return investments.value?.find((item) => {
      return item.id === form.investimento.id;
    });
  });

  // carteira selecionado
  const selectedWallet = computed(() => {
    if (selectedInvestment.value?.carteira.ativo) {
      return selectedInvestment.value?.carteira.descricaoCarteira;
    }
  });

  // filtra operações atreladas ao investimento selecionado
  const operations = computed(() => {
    return useOperation.operations.filter((item) => {
      return item.investimento.id === form.investimento.id;
    });
  });

  // operação selecionada
  const operation = computed(() => {
    return useOperation.operations.find((item) => {
      return item.investimento.id === form.investimento.id;
    });
  });

  // verifica se é operação de compra
  const operationType = computed(() => {
    return operation.value?.tipo === 'compra';
  });

  // verifica quantidade de operações de compra
  const operationShops = computed(() => {
    return operations.value.reduce((acc, curr) => {
      if (curr.tipo === 'compra') {
        return acc + curr.quantidade;
      } else {
        return acc;
      }
    }, 0);
  });

  // verifica quantidade de operações de venda
  const operationSales = computed(() => {
    return operations.value.reduce((acc, curr) => {
      if (curr.tipo === 'venda') {
        return acc + curr.quantidade;
      } else {
        return acc;
      }
    }, 0);
  });

  // diferença da operações de compra e venda
  const finalOperationValue = computed(() => {
    return operationShops.value - operationSales.value;
  });

  async function handleSubmit() {
    const formData = {
      ...form,
      investimento: { ...form.investimento, id: selectedInvestment.value?.id },
    };

    // se for operação de venda
    if (form.tipo === 'venda') {
      // verifica se a quantidade da operação é maior
      // que o total de operações de compra
      if (form.quantidade > finalOperationValue.value) {
        alert('Não é possível cadastrar uma venda com maior quantidade de compras que você tem.');
      } else {
        await registerLocalOperation(formData);
      }
      // se não tiver investimento selecionado estoura um erro
    } else if (form.investimento.id === 0) {
      alert('Por favor, selecione um investimento.');
    } else {
      await registerLocalOperation(formData);
    }
  }

  // pega investimentos quando o componente renderizar
  onMounted(() => {
    getLocalInvestments();
  });
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Cadastro de operação" />
    </header>

    <!-- Data -->
    <div class="form-row">
      <label for="data">Data</label>
      <input
        type="datetime-local"
        name="data"
        id="data"
        placeholder="dd/mm/aaaa"
        required
        v-model="form.data"
      />
    </div>

    <!-- Quantidade -->
    <div class="form-row">
      <label for="quantidade">Quantidade</label>
      <input
        type="number"
        name="quantidade"
        id="quantidade"
        min="0"
        required
        v-model="form.quantidade"
      />
    </div>

    <!-- Valor UN -->
    <div class="form-row">
      <label for="valor">Valor UN</label>
      <p class="currency">R$</p>
      <input
        type="number"
        name="valor"
        id="valor"
        step="0.01"
        class="valor-unitario"
        required
        v-model="form.valor"
      />
    </div>

    <!-- Valor Total -->
    <div class="form-row">
      <label for="valor_total">Valor Total</label>
      <input
        type="text"
        name="valor_total"
        id="valor_total"
        readonly
        required
        v-model="valorFinal"
      />
    </div>
    <!-- Investimento -->
    <div class="form-row">
      <label for="investimento">Investimento</label>
      <div class="custom-select" style="width: 90%">
        <select name="investimento" id="investimento" required v-model="form.investimento.id">
          <option disabled value="0" class="placeholder">Selecione um investimento</option>
          <option v-if="investments.length > 0" v-for="item in investments" :value="item.id">
            {{ item.nomeInvestimento }}
          </option>
          <option v-else disabled value="0">0 investimentos cadastrados</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
        <button type="button" class="modal-btn" @click="useOperation.modal = true">
          <Icon icon="octicon:plus-16" class="modal-icon" />
        </button>
      </div>
    </div>

    <!-- Carteira -->
    <div class="form-row">
      <label for="carteira">Carteira</label>
      <input type="text" name="carteira" id="carteira" readonly required v-model="selectedWallet" />
    </div>

    <!-- Operação -->
    <div class="form-row">
      <label for="operacao">Operação</label>
      <div class="custom-select">
        <select name="operacao" id="operacao" required v-model="form.tipo">
          <option disabled value="" class="placeholder">Selecione uma operação</option>
          <option>compra</option>
          <option v-if="operationType">venda</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <div class="buttons">
      <RouterLink to="/operacao/rendimento">Rendimento</RouterLink>
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
