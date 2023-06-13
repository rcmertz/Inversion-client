<script setup lang="ts">
  import { tableHead } from '@/data/carteira';
  import { formatCurrency } from '@/utils/formatCurrency';
  import { Icon } from '@iconify/vue';
  import { IInvestimento } from '@/interfaces/investimento';
  import { deleteInvestimento } from '@/stores/carteira';

  interface Props {
    tableData: IInvestimento[];
  }

  defineProps<Props>();
</script>

<template>
  <div class="container">
    <table>
      <tr class="table-head">
        <th v-for="item in tableHead" :key="item.id">
          {{ item.title }}
        </th>
        <th></th>
      </tr>
      <tr v-for="item in tableData" class="table-rows">
        <td class="table-name">
          {{ item.nome }}
        </td>
        <td class="table-operation">
          {{ item.operacao }}
        </td>
        <td class="table-quantity">
          {{ item.quantidade }}
        </td>
        <td class="table-price">
          {{ formatCurrency(item.preco) }}
        </td>
        <td class="table-income">
          {{ formatCurrency(item.rendimento) }}
        </td>
        <td class="table-date">
          {{ item.data }}
        </td>
        <td class="table-average">
          {{ formatCurrency(item.precoMedio) }}
        </td>
        <td class="table-total">
          {{ formatCurrency(item.valorTotal) }}
        </td>
        <td class="table-actions">
          <button
            type="button"
            class="action-btn edit-btn"
            @click="$router.push('/carteiras/editar-investimento/' + item.id)"
          >
            <Icon icon="bxs:pencil" class="action-icon edit-icon" />
          </button>
          <button
            type="button"
            class="action-btn delete-btn"
            @click="deleteInvestimento(item.id)"
          >
            <Icon icon="fa6-solid:trash-can" class="action-icon delete-icon" />
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  .container {
    background-color: #fff;
    overflow-x: auto;
    height: 580px;
    overflow-y: auto;
    margin-bottom: 36px;
  }

  .container::-webkit-scrollbar {
    width: 19px;
    margin-left: 10px;
  }

  .container::-webkit-scrollbar-track {
    background-color: #d9d9d9;
    border-radius: 8px;
  }

  .container::-webkit-scrollbar-thumb {
    background-color: #959595;
    border-radius: 6px;
  }

  table {
    min-width: max-content;
    width: 100%;
    border-collapse: collapse;
  }

  .table-head {
    position: sticky;
    top: 0px;
  }

  th {
    background-color: var(--background);
    color: #acacac;
    font-family: var(--inter);
    font-weight: 600;
    font-size: 20px;
    text-align: left;
    padding: 12px 16px;
  }

  .table-rows {
    background-color: #fff;
  }

  .table-rows:nth-child(odd) {
    background-color: #f8f8f8;
  }

  td {
    color: #000;
    padding: 24px 16px;
    font-family: var(--inter);
    font-size: 20px;
    font-weight: 600;
  }

  .table-operation {
    text-transform: uppercase;
  }

  .table-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .action-btn {
    display: grid;
    place-items: center;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
  }

  .edit-btn {
    background-color: var(--primary-alt);
  }

  .delete-btn {
    background-color: #e51a1a;
  }

  .action-icon {
    font-size: 20px;
  }

  .modal {
    position: absolute;
    top: 50%;
    left: calc(50% + 52px);
    transform: translate(-50%, -50%);
    z-index: 2;
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
</style>
