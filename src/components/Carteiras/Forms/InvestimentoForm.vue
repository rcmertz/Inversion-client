<script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { Icon } from '@iconify/vue';
  import { formatCurrency } from '@/utils/formatCurrency';
  import SectionTitle from '@/components/SectionTitle.vue';
  import { tableBody } from '@/data/carteira';
  import { useRoute, useRouter } from 'vue-router';
  import { updateInvestimento } from '@/stores/carteira';

  interface Props {
    carteiraId: string | string[];
  }

  const props = defineProps<Props>();

  const route = useRoute();
  const router = useRouter();

  // lógica do formulário
  const form = reactive({ ...tableBody[Number(route.params.id) - 1], carteira: '' });

  const valorFinal = computed(() => {
    return formatCurrency(form.quantidade * form.preco);
  });

  async function handleSubmit() {
    await updateInvestimento({
      id: route.params.id,
      investimento: { ...form, valorTotal: form.quantidade * form.preco },
    });

    router.push('/carteiras/' + props.carteiraId);
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Editar investimento" />
    </header>

    <!-- Investimento -->
    <div class="form-row">
      <label for="investimento">Investimento</label>
      <div class="custom-select">
        <select name="investimento" id="investimento" v-model="form.nome">
          <option disabled value="" class="placeholder">Selecione um investimento</option>
          <option>LCI/IPCA + 4% INTER</option>
          <option>CDB + 4% INTER</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <!-- Quantidade -->
    <div class="form-row">
      <label for="quantidade">Quantidade</label>
      <input type="number" name="quantidade" id="quantidade" min="0" v-model="form.quantidade" />
    </div>

    <!-- Valor UN -->
    <div class="form-row">
      <label for="valor_unitario">Valor UN</label>
      <input type="number" name="valor_unitario" id="valor_unitario" min="0" v-model="form.preco" />
    </div>

    <!-- Valor Total -->
    <div class="form-row">
      <label for="valor_total">Valor Total</label>
      <input type="text" name="valor_total" id="valor_total" v-model="valorFinal" readonly />
    </div>

    <!-- Data -->
    <div class="form-row">
      <label for="data">Data</label>
      <input type="date" name="data" id="data" v-model="form.data" />
    </div>

    <!-- Carteira -->
    <div class="form-row">
      <label for="carteira">Carteira</label>
      <div class="custom-select">
        <select name="carteira" id="carteira" v-model="form.carteira">
          <option disabled value="" class="placeholder">Selecione uma carteira</option>
          <option>Renda fixa</option>
          <option>Criptomoeda</option>
          <option>Renda variável</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <!-- Operação -->
    <div class="form-row">
      <label for="operacao">Operação</label>
      <div class="custom-select">
        <select name="operacao" id="operacao" v-model="form.operacao">
          <option disabled value="" class="placeholder">Selecione uma operação</option>
          <option>Compra</option>
          <option>Venda</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <div class="buttons">
      <RouterLink :to="'/carteiras/editar-rendimento/' + $route.params.id">Rendimento</RouterLink>
      <button type="button" class="cancel-edit" @click="$router.push('/carteiras/' + carteiraId)">
        Cancelar
      </button>
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
    box-shadow: 0 4px 16px -5px rgba(0, 0, 0, 0.25);
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
    box-shadow: 0 4px 12px -5px rgba(0, 0, 0, 0.25);
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
