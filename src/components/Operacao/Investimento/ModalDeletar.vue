<script setup lang="ts">
  import SectionTitle from '@/components/SectionTitle.vue';
  import { useInvestment } from '@/stores/investment';
  import { useOperation } from '@/stores/operation';

  interface Props {
    handleDelete: () => void;
  }

  defineProps<Props>();
</script>

<template>
  <div class="modal">
    <SectionTitle title="Deletar um investimento irá deletar todas as operações atreladas." />
    <h3>Deseja prosseguir com a remoção?</h3>
    <div class="modal-btns">
      <button
        type="button"
        class="action-btn cancel-btn"
        @click="(useInvestment.modal = false), (useOperation.modal = false)"
      >
        Cancelar
      </button>
      <button type="button" class="action-btn delete-btn" @click="handleDelete">Deletar</button>
    </div>
  </div>

  <div @click="useInvestment.modal = false" class="back-layer"></div>
</template>

<style scoped>
  .modal {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: absolute;
    top: calc(0px + 50%);
    left: calc(50%);
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
