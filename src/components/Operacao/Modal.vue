<script setup lang="ts">
  import { useOperation } from '@/stores/operation';
  import SectionTitle from '../SectionTitle.vue';
  import { getLocalWallets, useWallet } from '@/stores/wallet';
  import { Icon } from '@iconify/vue';
  import { registerLocalInvestment } from '@/stores/investment';
  import { computed, onMounted, reactive } from 'vue';

  const form = reactive({
    nomeInvestimento: '',
    valorInvestimento: 0,
    ativo: true,
    carteira: {
      ativo: true,
      descricaoCarteira: '',
    },
  });

  const wallets = computed(() => {
    return useWallet.wallets.filter((item) => item.ativo);
  });

  const selectedWallet = computed(() => {
    return wallets.value.find((item) => item.ativo && item.descricaoCarteira === form.carteira.descricaoCarteira);
  });

  async function handleSubmit() {
    const formData = {
      ...form,
      nomeInvestimento: form.nomeInvestimento.toUpperCase(),
      carteira: {
        ...form.carteira,
        id: selectedWallet.value?.id,
      },
    };

    await registerLocalInvestment(formData);

    useOperation.modal = false;
  }

  onMounted(() => {
    getLocalWallets();
  });
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Cadastro de investimento" />
    </header>

    <div class="form-row">
      <label for="tipo">Investimento</label>
      <input
        id="tipo"
        v-model="form.nomeInvestimento"
        placeholder="Nome do investimento"
        required
      />
    </div>

    <div class="form-row">
      <label for="carteira">Carteira</label>
      <div class="custom-select">
        <select id="carteira" v-model="form.carteira.descricaoCarteira" required>
          <option disabled value="" class="placeholder">Selecione uma carteira</option>
          <option v-if="wallets.length > 0" v-for="item in wallets">
            {{ item.descricaoCarteira }}
          </option>
          <option disabled value="" v-else>0 carteiras cadastradas</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <button type="submit" class="submit">Confirmar</button>
  </form>

  <div class="back-layer" @click="useOperation.modal = false"></div>
</template>

<style scoped>
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: #fff;
    border-radius: 10px;
    padding: 48px;
    column-gap: 32px;
    row-gap: 20px;
  }

  header {
    margin-bottom: 20px;
    grid-column: span 2;
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

  input {
    border-radius: 4px;
    padding: 24px;
    background-color: var(--input);
    font-size: 24px;
    font-family: var(--montserrat);
    font-weight: 500;
    color: rgba(0, 0, 0, 40%);
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

  .submit {
    grid-column: span 2 / span 2;
    place-self: flex-end;
    background-color: var(--primary-alt);
    font-family: var(--inter);
    font-weight: 600;
    font-size: 24px;
    text-transform: uppercase;
    border-radius: 8px;
    padding: 20px 40px;
    text-decoration: none;
    color: unset;
    cursor: pointer;
  }

  .back-layer {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
</style>
