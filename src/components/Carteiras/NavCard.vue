<script setup lang="ts">
  import { IWallet } from '@/interfaces/wallet';
  import { router } from '@/routes/routes';
  import { deleteLocalWallet } from '@/stores/wallet';
  import { Icon } from '@iconify/vue';
  import { ref } from 'vue';

  const props = defineProps<{ item: IWallet }>();

  const modal = ref(false);

  // pega carteiras quando componente renderizar
  async function handleDeletion() {
    await deleteLocalWallet(props.item.id, { ...props, ativo: false });
    modal.value = false;
    router.push('/carteiras');
  }
</script>

<template>
  <div class="link-container">
    <RouterLink :to="'/carteiras/' + item.id" class="nav-link" active-class="nav-link active">
      <Icon icon="ooui:user-avatar" class="link-icon" />
      <p>{{ item.descricaoCarteira }}</p>
    </RouterLink>
    <button type="button" @click="modal = true" class="trash-btn">
      <Icon icon="fa6-solid:trash-can" class="trash-icon" />
    </button>
  </div>
  <div v-if="modal" class="modal">
    <h2>Tem certeza que deseja deletar essa carteira?</h2>
    <div class="modal-btns">
      <button type="button" class="action-btn cancel-btn" @click="modal = false">Cancelar</button>
      <button type="button" class="action-btn delete-btn" @click="handleDeletion">Deletar</button>
    </div>
  </div>
  <div v-if="modal" @click="modal = false" class="back-layer"></div>
</template>

<style scoped>
  .link-container {
    position: relative;
    width: fit-content;
  }

  .nav-link {
    width: 289px;
    min-width: max-content;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 42px 30px;
    color: unset;
    text-decoration: none;
    background-color: var(--primary-alt);
    border-radius: 5px;
    transition: all 0.3s;
    z-index: 1;
  }

  .nav-link:hover {
    background-color: var(--primary);
  }

  .nav-link.active {
    background-color: var(--primary);
  }

  .nav-link > p {
    font-family: var(--montserrat);
    font-size: 17px;
    font-weight: 500;
    text-transform: uppercase;
    margin-right: auto;
    margin-right: 30px;
  }

  .link-icon {
    font-size: 26px;
  }

  .trash-btn {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    z-index: 2;
  }

  .trash-btn:hover .trash-icon {
    color: #fff;
  }

  .trash-icon {
    font-size: 26px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .modal {
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: absolute;
    top: calc(0px + 50%);
    left: calc(50% + 52px);
    transform: translate(-50%, -50%);
    z-index: 4;
    background-color: #fff;
    border-radius: 12px;
    padding: 48px;
  }

  .back-layer {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: #000;
    opacity: 0.3;
  }

  .modal-btns {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .action-btn {
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

  .action-btn:first-child {
    background-color: #ff0000;
  }
</style>
