import { IOperation } from '@/interfaces/operation';
import {
  deleteOperation,
  getAllOperations,
  getSingleOperation,
  registerOperation,
  updateOperation,
} from '@/services/operation';
import { reactive } from 'vue';
import { getLocalIncomes, useIncome } from './income';

export const useOperation = reactive({
  modal: false,
  operations: [] as IOperation[],
  operation: undefined as IOperation | undefined,
});

export async function registerLocalOperation(operationData: object) {
  try {
    const { data } = await registerOperation(operationData);

    useOperation.operations.push(data);

    alert('Operação cadastrada com sucesso!');
  } catch (error: any) {
    console.log(error);
    console.log(error.response.data.erro);
  }
}

export async function getLocalOperations() {
  try {
    const { data } = await getAllOperations();
    await getLocalIncomes();

    await data.content.map((item: IOperation) => {
      item.rendimentos = useIncome.incomes.filter((income) => income.operacao.id === item.id);
    });

    useOperation.operations = data.content;
  } catch (error) {
    console.log(error);
  }
}

export async function getLocalOperation(id: number) {
  try {
    const { data } = await getSingleOperation(id);

    useOperation.operation = data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateLocalOperation(id: number, operationData: object) {
  try {
    const { data } = await updateOperation(id, operationData);

    useOperation.operations = useOperation.operations.map((item) => {
      if (item.id === id) {
        return { ...item, data };
      } else {
        return item;
      }
    });

    alert('Operação atualizada com sucesso!');
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLocalOperation(id: number, operationData: object) {
  try {
    await deleteOperation(id, operationData);

    useOperation.operations = useOperation.operations.filter((item) => {
      return item.id !== id;
    });
  } catch (error) {
    console.log(error);
  }
}
