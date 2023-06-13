<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { ref } from 'vue';
  import SectionTitle from '../SectionTitle.vue';
  import { registerCarteira } from '@/stores/carteira';

  const modal = ref(false);
  const carteira = ref('');

  async function handleSubmit() {
    await registerCarteira(carteira.value);
    modal.value = false;
  }
</script>

<template>
  <form v-if="modal" @submit.prevent="handleSubmit">
    <SectionTitle title="Cadastre sua carteira" />
    <input
      type="text"
      name="carteira"
      v-model="carteira"
      placeholder="Nome da carteira..."
      required
    />
    <button type="submit">Cadastrar</button>
  </form>
  <div v-if="modal" class="back-layer" @click="modal = false"></div>
  <button class="open-modal" @click="modal = !modal">
    <Icon icon="ooui:user-avatar" class="link-icon" />
    <p>Cadastrar carteira</p>
  </button>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: absolute;
    top: 50%;
    left: calc(50% + 52px);
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: #fff;
    border-radius: 12px;
    padding: 48px;
  }

  input {
    border-radius: 4px;
    padding: 24px;
    background-color: var(--input);
    font-size: 20px;
    font-family: var(--montserrat);
    font-weight: 500;
    color: rgba(0, 0, 0, 40%);
    margin-top: 12px;
  }

  button {
    background-color: var(--primary-alt);
    font-family: var(--inter);
    font-weight: 600;
    font-size: 20px;
    text-transform: uppercase;
    border-radius: 8px;
    padding: 16px 0;
    cursor: pointer;
  }

  .back-layer {
    width: 100vw;
    height: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #000;
    opacity: 0.3;
  }

  .open-modal {
    width: 289px;
    min-width: max-content;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 42px 30px;
    background-color: var(--primary-alt);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .open-modal:hover {
    background-color: var(--primary);
  }

  .open-modal > p {
    font-family: var(--montserrat);
    font-size: 17px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .link-icon {
    font-size: 26px;
  }
</style>
