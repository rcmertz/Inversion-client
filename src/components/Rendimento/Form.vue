<script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { Icon } from '@iconify/vue';
  import SectionTitle from '../SectionTitle.vue';
  import { formatCurrency } from '@/utils/formatCurrency';

  const form = reactive({
    investimento: '',
    quantidade: 0,
    valorUnitario: 0,
    data: '',
    carteira: '',
    operacao: '',
  });

  // const valorUnitario = computed(() => {
  //   return formatCurrency(form.quantidade * form.valorUnitario);
  // });

  const valorFinal = computed(() => {
    return formatCurrency(form.quantidade * form.valorUnitario);
  });

  function handleSubmit() {
    console.log({ ...form, valorFinal: form.quantidade * form.valorUnitario });
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Cadastro de rendimento" />
    </header>

    <!-- Investimento -->
    <div class="form-row">
      <label for="investimento">Investimento</label>
      <div class="custom-select">
        <select name="investimento" id="investimento" v-model="form.investimento" required>
          <option disabled value="" class="placeholder">Selecione um investimento</option>
          <option>LCI/IPCA + 4% INTER</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <!-- Quantidade -->
    <div class="form-row">
      <label for="quantidade">Quantidade</label>
      <input type="number" name="quantidade" id="quantidade" min="0" v-model="form.quantidade" required />
    </div>

    <!-- Valor UN -->
    <div class="form-row">
      <label for="valor_unitario">Valor UN</label>
      <input type="number" name="valor_unitario" id="valor_unitario" min="0" v-model="form.valorUnitario" required />
    </div>

    <!-- Valor Total -->
    <div class="form-row">
      <label for="valor_total">Valor Total</label>
      <input type="text" name="valor_total" id="valor_total" v-model="valorFinal" readonly required />
    </div>

    <!-- Data -->
    <div class="form-row">
      <label for="data">Data</label>
      <input type="date" name="data" id="data" v-model="form.data" placeholder="dd/mm/aaaa" required />
    </div>

    <!-- Carteira -->
    <div class="form-row">
      <label for="carteira">Carteira</label>
      <div class="custom-select">
        <select name="carteira" id="carteira" v-model="form.carteira" required>
          <option disabled value="" class="placeholder">Selecione uma carteira</option>
          <option>Renda fixa</option>
          <option>Criptomoeda</option>
          <option>Renda variável</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <div class="buttons">
      <RouterLink to="/investimento">Investimento</RouterLink>
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
