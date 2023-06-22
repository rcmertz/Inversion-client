<script setup lang="ts">
  import { computed } from 'vue';
  import { Icon } from '@iconify/vue';
  import { formatCurrency } from '@/utils/formatCurrency';
  import SectionTitle from '@/components/SectionTitle.vue';
  import { useRouter } from 'vue-router';
  import { updateLocalInvestment } from '@/stores/investment';
  import { IInvestment } from '@/interfaces/investment';

  interface Props {
    investment: IInvestment;
    wallet: IInvestment['carteira'];
  }

  const props = defineProps<Props>();

  const router = useRouter();

  const valorFinal = computed(() => {
    return formatCurrency(props.investment.quantidade * props.investment.valor);
  });

  async function handleSubmit() {
    await updateLocalInvestment(props.investment.id, {
      ...props.investment,
      carteira: {
        id: props.wallet.id,
      },
    });

    router.push('/carteiras/' + props.wallet.id);
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Editar investimento" />
    </header>

    <!-- Investimento -->
    <div class="form-row">
      <label for="descricao">Investimento</label>
      <input type="text" name="descricao" id="descricao" v-model="investment.tipo" />
    </div>

    <!-- Quantidade -->
    <div class="form-row">
      <label for="quantidade">Quantidade</label>
      <input
        type="number"
        name="quantidade"
        id="quantidade"
        min="0"
        v-model="investment.quantidade"
      />
    </div>

    <!-- Valor UN -->
    <div class="form-row">
      <label for="valor_unitario">Valor UN</label>
      <p class="currency">R$</p>
      <input
        type="number"
        name="valor_unitario"
        id="valor_unitario"
        min="0"
        step="0.01"
        v-model="investment.valor"
        class="valor-unitario"
        required
      />
    </div>

    <!-- Valor Total -->
    <div class="form-row">
      <label for="valor_total">Valor Total</label>
      <input type="text" name="valor_total" id="valor_total" v-model="valorFinal" readonly />
    </div>

    <!-- Data -->
    <div class="form-row">
      <label for="data">Data</label>
      <input type="date" name="data" id="data" v-model="investment.cadastro" />
    </div>

    <!-- Carteira -->
    <div class="form-row">
      <label for="carteira">Carteira</label>
      <input type="text" id="carteira" v-model="wallet.descricaoCarteira" />
    </div>

    <!-- Operação -->
    <div class="form-row">
      <label for="operacao">Operação</label>
      <div class="custom-select">
        <select name="operacao" id="operacao" v-model="investment.operacao">
          <option disabled value="" class="placeholder">Selecione uma operação</option>
          <option>Compra</option>
          <option>Venda</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <div class="buttons">
      <RouterLink :to="'/investimento/editar-rendimento/' + $route.params.id">
        Rendimento
      </RouterLink>
      <RouterLink :to="'/carteiras/' + wallet.id" class="cancel-edit">
        Cancelar
      </RouterLink>
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
    grid-column: span 1 / span 1;
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
    height: 84px;
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
    grid-column: span 3 / span 3;
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

  .cancel-edit {
    background-color: #e51a1a;
  }

  @media (max-width: 1400px) {
    form {
      grid-template-columns: repeat(2, 1fr);
    }

    .buttons {
      grid-column: span 2 / span 2;
    }
  }
</style>
