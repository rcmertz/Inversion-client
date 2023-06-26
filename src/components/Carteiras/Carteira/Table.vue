<script setup lang="ts">
  import { tableHead } from '@/data/carteira';
  import { IOperation } from '@/interfaces/operation';
  import { formatCurrency } from '@/utils/formatCurrency';
  import { formatDate } from '@/utils/formatDate';
  import { Icon } from '@iconify/vue';
  import { deleteLocalOperation } from '@/stores/operation';
  import { router } from '@/routes/routes';
  import { IInvestment } from '@/interfaces/investment';
  import { IIncome } from '@/interfaces/income';

  interface Props {
    incomes: IIncome[];
    operations: IOperation[];
    investments: IInvestment[];
  }

  const props = defineProps<Props>();

  function getOperationIncome(operation: IOperation) {
    const tempIncomes = props.incomes.filter((item) => {
      return item.operacao.id === operation.id;
    });

    const totalValue = tempIncomes.reduce((acc, curr) => {
      return acc + curr.preco_un * curr.quantidade;
    }, 0);

    return totalValue;
  }

  function getAveragePrice(operation: IOperation) {
    const tempInvestments = props.investments?.find((item) => {
      if (operation.tipo === 'compra') {
        return item.id === operation.investimento.id;
      }
    });

    const shopOperations = tempInvestments?.operacoes.filter((item) => {
      return item.tipo === 'compra';
    });

    const totalValue = tempInvestments?.operacoes?.reduce((acc, curr) => {
      if (curr.tipo === 'compra') {
        return acc + curr.valor * curr.quantidade;
      } else {
        return acc;
      }
    }, 0);

    const price = totalValue! / shopOperations?.length!;

    return price;
  }

  async function handleDeletion(id: number, item: IOperation) {
    const message = confirm('Tem certeza que deseja remover essa operação?');
    if (message) {
      await deleteLocalOperation(id, { ...item, ativo: false });
      router.go(0);
    }
  }
</script>

<template>
  <div class="container" v-if="operations.length > 0">
    <table>
      <tr class="table-head">
        <th v-for="item in tableHead" :key="item.id">
          {{ item.title }}
        </th>
        <th>Ações</th>
      </tr>
      <tr v-for="item in operations.sort((a, b) => a?.id - b?.id)" class="table-rows">
        <td class="table-name">
          {{ item.investimento.nomeInvestimento }}
        </td>
        <td class="table-operation">
          {{ item.tipo }}
        </td>
        <td class="table-quantity">
          {{ item.quantidade }}
        </td>
        <td class="table-price">
          {{ formatCurrency(item.valor) }}
        </td>
        <td class="table-income">
          {{ formatCurrency(getOperationIncome(item)) }}
        </td>
        <td class="table-date">
          {{ formatDate(item.data) }}
        </td>
        <td class="table-average" v-if="!isNaN(getAveragePrice(item))">
          {{ formatCurrency(getAveragePrice(item)) }}
        </td>
        <td class="table-average" v-else>
          {{ formatCurrency(0) }}
        </td>
        <td class="table-total">
          {{ formatCurrency(item.quantidade * item.valor + getOperationIncome(item)) }}
        </td>
        <td class="table-actions">
          <RouterLink class="action-btn edit-btn" :to="'/operacao/editar-operacao/' + item?.id">
            <Icon icon="bxs:pencil" class="action-icon edit-icon" />
          </RouterLink>
          <button
            type="button"
            class="action-btn delete-btn"
            @click="handleDeletion(item.id, { ...item, ativo: false })"
          >
            <Icon icon="fa6-solid:trash-can" class="action-icon delete-icon" />
          </button>
        </td>
      </tr>
    </table>
  </div>
  <div v-else class="disclaim">
    <h2>Essa carteira ainda não tem operações...</h2>
    <RouterLink to="/operacao" class="link">Clique aqui para cadastrar!</RouterLink>
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
    color: #000;
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

  .disclaim {
    color: #fff;
  }

  .link {
    color: var(--primary);
  }
</style>
