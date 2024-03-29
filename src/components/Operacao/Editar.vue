<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import SectionTitle from '../SectionTitle.vue';
  import { getLocalOperation, updateLocalOperation, useOperation } from '@/stores/operation';
  import { useInvestment } from '@/stores/investment';
  import { computed, onMounted, ref } from 'vue';
  import { getLocalInvestments } from '@/stores/investment';
  import { formatCurrency } from '@/utils/formatCurrency';
  import { useRoute } from 'vue-router';
  import { router } from '@/routes/routes';

  // valores enviados ao backend
  const form = ref({
    quantidade: 0,
    valor: 0,
    tipo: '',
    data: '',
    ativo: true,
    investimento: {
      id: 0,
      ativo: true,
      nomeInvestimento: '',
    },
  });

  // calcula valor final e faz a máscara no input
  const valorFinal = computed(() => {
    return formatCurrency(form.value.quantidade * form.value.valor);
  });

  // filtra investimentos ativos
  const investments = computed(() => {
    return useInvestment.investments?.filter((item) => item.ativo);
  });

  // investimento selecionado
  const selectedInvestment = computed(() => {
    return investments.value?.find((item) => {
      return item?.id === form.value.investimento.id;
    });
  });

  // carteira selecionada
  const selectedWallet = computed(() => {
    return selectedInvestment.value?.carteira;
  });

  // nome da carteira selecionada
  const walletName = computed(() => {
    return selectedWallet.value?.descricaoCarteira;
  });

  // id da carteira selecionada
  const walletId = computed(() => {
    return selectedWallet.value?.id;
  });

  async function handleSubmit() {
    const formData = {
      ...form.value,
      investimento: {
        ...form.value.investimento,
        id: selectedInvestment.value?.id,
        ativo: true,
      },
    };

    // se não tiver investimento selecionado
    // estoura um erro e retorna
    if (form.value.investimento.id === 0) {
      alert('Por favor, selecione um investimento.');
    } else {
      await updateLocalOperation(Number(route.params.id), formData);
      router.push('/carteiras/' + selectedWallet.value?.id);
    }
  }

  const route = useRoute();

  // pega operação e investimentos quando o componente renderizar e
  // atualiza dos valores a serem enviados ao backend
  onMounted(async () => {
    await getLocalOperation(Number(route.params.id));
    await getLocalInvestments();
    form.value = { ...useOperation.operation! };
  });
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Editar operação" />
    </header>

    <!-- Investimento -->
    <div class="form-row">
      <label for="investimento">Investimento</label>
      <div class="custom-select">
        <select name="investimento" id="investimento" required v-model="form.investimento.id">
          <option disabled value="0" class="placeholder">Selecione um investimento</option>
          <option v-if="investments.length > 0" v-for="item in investments" :value="item.id">
            {{ item.nomeInvestimento }}
          </option>
          <option v-else value="0">0 investimentos cadastrados</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
        <button type="button" class="modal-btn" @click="useOperation.modal = true">
          <Icon icon="bxs:pencil" class="modal-icon" />
        </button>
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
        min="0"
        step="0.01"
        class="valor-unitario"
        required
        v-model="form.valor"
      />
    </div>

    <!-- Valor Total -->
    <div class="form-row">
      <label for="valor_total">Valor Total</label>
      <input type="text" name="valor_total" id="valor_total" readonly v-model="valorFinal" />
    </div>

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

    <!-- Valor Investimento -->
    <div class="form-row" v-if="selectedInvestment">
      <label for="valorInvestimento">Valor Investimento</label>
      <input
        type="text"
        name="valorInvestimento"
        id="valorInvestimento"
        readonly
        required
        :value="formatCurrency(selectedInvestment.valorInvestimento ?? 0)"
      />
    </div>

    <!-- Saldo -->
    <div class="form-row" v-if="selectedInvestment">
      <label for="saldo">Saldo</label>
      <input
        type="text"
        name="saldo"
        id="saldo"
        readonly
        required
        :value="selectedInvestment.saldo ?? 0"
      />
    </div>

    <!-- Carteira -->
    <div class="form-row">
      <label for="carteira">Carteira</label>
      <input type="text" name="carteira" id="carteira" readonly required v-model="walletName" />
    </div>

    <!-- Operação -->
    <div class="form-row">
      <label for="operacao">Operação</label>
      <div class="custom-select">
        <select name="operacao" id="operacao" required v-model="form.tipo">
          <option disabled value="" class="placeholder">Selecione uma operação</option>
          <option>compra</option>
          <option>venda</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <div class="buttons">
      <RouterLink :to="'/carteiras/' + walletId" class="cancel">Voltar</RouterLink>
      <RouterLink to="/operacao/editar-rendimento">Rendimento</RouterLink>
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
    gap: 40px;
    grid-column: span 3 / span 3;
    place-self: flex-end;
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
    border: none;
    cursor: pointer;
  }

  .buttons :nth-child(1) {
    background-color: var(--dashboard-status-loss);
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

  @media (max-width: 1400px) {
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

  @media (max-width: 1400px) {
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
