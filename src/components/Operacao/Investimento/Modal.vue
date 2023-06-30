<script setup lang="ts">
  import { useOperation } from '@/stores/operation';
  import SectionTitle from '../../SectionTitle.vue';
  import { getLocalWallets, useWallet } from '@/stores/wallet';
  import { Icon } from '@iconify/vue';
  import {
    deleteLocalInvestment,
    getLocalInvestments,
    updateLocalInvestment,
    useInvestment,
  } from '@/stores/investment';
  import { computed, onMounted, ref, watch } from 'vue';
  import { router } from '@/routes/routes';
  import ModalDeletar from './ModalDeletar.vue';

  // valores enviados ao backend
  const form = ref({
    investimentoId: 0,
    nomeInvestimento: '',
    valorInvestimento: 0,
    ativo: true,
    carteira: {
      ativo: true,
      descricaoCarteira: '',
      carteiraId: 0,
    },
  });

  // filtra investimentos ativos
  const investments = computed(() => {
    return useInvestment.investments.filter((item) => item.ativo);
  });

  // investimento selecionado
  const selectedInvestment = computed(() => {
    return investments.value.find((item) => {
      return item.id === form.value.investimentoId;
    });
  });

  // filtra carteiras ativas
  const wallets = computed(() => {
    return useWallet.wallets.filter((item) => item.ativo);
  });

  // carteira selecionada
  const selectedWallet = computed(() => {
    return wallets.value.find((item) => {
      return item.id === form.value.carteira.carteiraId;
    });
  });

  // quando o investimento é selecionado
  // salva os dados para fazer a requisição
  watch(selectedInvestment, (value) => {
    form.value.nomeInvestimento = value!.nomeInvestimento;
    form.value.carteira.carteiraId = value?.carteira.id!;
  });

  async function handleSubmit() {
    await updateLocalInvestment(form.value.investimentoId, {
      ...form.value,
      nomeInvestimento: form.value.nomeInvestimento.toUpperCase(),
      id: selectedInvestment.value?.id,
      cadastro: selectedInvestment.value?.cadastro,
      carteira: {
        id: selectedWallet.value?.id,
        descricaoCarteira: selectedWallet.value?.descricaoCarteira,
        ativo: true,
      },
    });

    router.go(0);

    useOperation.modal = false;
  }

  async function handleDelete() {
    await deleteLocalInvestment(selectedInvestment.value?.id!, {
      ...form.value,
      id: selectedInvestment.value?.id,
      nomeInvestimento: form.value.nomeInvestimento.toUpperCase(),
      cadastro: selectedInvestment.value?.cadastro,
      ativo: false,
      carteira: {
        id: form.value.carteira.carteiraId,
        ativo: true,
      },
    });

    alert('Investimento desativado com sucesso!');
  }

  // pega investimentos e carteiras quando o componente é renderizado
  onMounted(() => {
    getLocalInvestments();
    getLocalWallets();
  });
</script>

<template>
  <ModalDeletar v-if="useInvestment.modal" :handleDelete="handleDelete" />
  <form @submit.prevent="handleSubmit">
    <header>
      <SectionTitle title="Editar investimento" />
    </header>

    <div class="form-row">
      <label for="investimento-antigo">Investimento (antigo)</label>
      <div class="custom-select">
        <select
          id="investimento-antigo"
          name="investimento-antigo"
          required
          v-model="form.investimentoId"
        >
          <option disabled value="0" class="placeholder">Selecione um investimento</option>
          <option v-if="investments.length > 0" v-for="item in investments" :value="item.id">
            {{ item.nomeInvestimento }}
          </option>
          <option disabled value="0" v-else>0 investimentos cadastrados</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <div class="form-row">
      <label for="carteira">Carteira</label>
      <div class="custom-select">
        <select id="carteira" name="carteira" required v-model="form.carteira.carteiraId">
          <option disabled value="0" class="placeholder">Selecione uma carteira</option>
          <option v-if="wallets.length > 0" v-for="item in wallets" :value="item.id">
            {{ item.descricaoCarteira }}
          </option>
          <option disabled value="0" v-else>0 carteiras cadastradas</option>
        </select>
        <Icon icon="icon-park-outline:down" class="select-icon" />
      </div>
    </div>

    <div class="form-row">
      <label for="investimento">Novo investimento</label>
      <input id="investimento" name="investimento" required v-model="form.nomeInvestimento" />
    </div>

    <div class="btns">
      <button type="button" class="delete" @click="useInvestment.modal = true">Deletar</button>
      <button type="submit" class="submit">Confirmar</button>
    </div>
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

  .btns {
    display: flex;
    grid-column: span 2 / span 2;
    place-self: flex-end;
    gap: 24px;
  }

  .submit {
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

  .delete {
    background-color: var(--dashboard-status-loss);
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
