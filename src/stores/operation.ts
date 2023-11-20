import {
  IGetOperations,
  IGetOperationsByDate,
  IGetOperationsByDateAndInvestment,
  IGetOperationsByInvestment,
  IOperation,
} from '@/interfaces/operation';
import {
  deleteOperation,
  getAllOperations,
  getOperationsByDate,
  getOperationsByDateAndInvestment,
  getOperationsByInvestment,
  getOperationsByWallet,
  getSingleOperation,
  registerOperation,
  updateOperation,
} from '@/services/operation';
import { reactive } from 'vue';
import { getLocalIncomes, useIncome } from './income';

// store da operação
export const useOperation = reactive({
  modal: false,
  operations: [] as IOperation[],
  operation: undefined as IOperation | undefined,
  page: 0,
  totalPages: 0,
  investmentId: 0,
  dates: {
    start: '',
    end: '',
  },
});

// cadastrar operação e atualizar store automaticamente
export async function registerLocalOperation(operationData: object) {
  try {
    const { data } = await registerOperation(operationData);

    useOperation.operations.push(data);

    alert('Operação cadastrada com sucesso!');
  } catch (error: any) {
    // alert(error);
    alert(error.response.data.erro);
  }
}

// pegar operações, salvar resposta na store
export async function getLocalOperations() {
  try {
    const { data } = await getAllOperations();
    await getLocalIncomes();

    // incluir rendimentos atrelados em objetos de operação
    data.content.map((item: IOperation) => {
      item.rendimentos = useIncome.incomes.filter((income) => income.operacao.id === item.id);
    });

    useOperation.totalPages = 1;
    useOperation.operations = data.content;
  } catch (error) {
    console.log(error);
  }
}

// filtrar operações por data, salvar resposta na store, salvar resposta na store
export async function getLocalOperationsByWallet({ size, carteira }: IGetOperations) {
  try {
    const { data } = await getOperationsByWallet(size, useOperation.page, carteira);
    await getLocalIncomes();

    // incluir rendimentos atrelados em objetos de operação
    data.content.map((item: IOperation) => {
      item.rendimentos = useIncome.incomes.filter((income) => income.operacao.id === item.id);
    });

    useOperation.totalPages = data.totalPages;
    useOperation.operations = data.content;
  } catch (error) {
    console.log(error);
  }
}

// filtrar operações por investimento que estão atreladas, salvar resposta na store
export async function getLocalOperationsByInvestment({ size, id }: IGetOperationsByInvestment) {
  try {
    const { data } = await getOperationsByInvestment(size, useOperation.page, id);
    await getLocalIncomes();

    // incluir rendimentos atrelados em objetos de operação
    data.content.map((item: IOperation) => {
      item.rendimentos = useIncome.incomes.filter((income) => income.operacao.id === item.id);
    });

    useOperation.totalPages = data.totalPages;
    useOperation.operations = data.content;
  } catch (error) {
    console.log(error);
  }
}

// filtrar operações por data, salvar resposta na store
export async function getLocalOperationsByDate({
  size,
  carteira,
  start,
  end,
}: IGetOperationsByDate) {
  try {
    const { data } = await getOperationsByDate(size, useOperation.page, carteira, start, end);
    await getLocalIncomes();

    // incluir rendimentos atrelados em objetos de operação
    data.content.map((item: IOperation) => {
      item.rendimentos = useIncome.incomes.filter((income) => income.operacao.id === item.id);
    });

    useOperation.totalPages = data.totalPages;
    useOperation.operations = data.content;
  } catch (error) {
    console.log(error);
  }
}

// filtrar operações por data e investimento que estão atreladas, salvar resposta na store
export async function getLocalOperationsByDateAndInvestment({
  size,
  id,
  start,
  end,
}: IGetOperationsByDateAndInvestment) {
  try {
    const { data } = await getOperationsByDateAndInvestment(
      size,
      useOperation.page,
      id,
      start,
      end
    );
    await getLocalIncomes();

    // incluir rendimentos atrelados em objetos de operação
    data.content.map((item: IOperation) => {
      item.rendimentos = useIncome.incomes.filter((income) => income.operacao.id === item.id);
    });

    useOperation.totalPages = data.totalPages;
    useOperation.operations = data.content;
  } catch (error) {
    console.log(error);
  }
}

// mudar página
export function changePage(page: number) {
  useOperation.page = page;
}

// pegar operação e salvar na store
export async function getLocalOperation(id: number) {
  try {
    const { data } = await getSingleOperation(id);

    useOperation.operation = data;
  } catch (error) {
    console.log(error);
  }
}

// editar operação e atualizar store automaticamente
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
    // console.log(error);
    alert(error.response.data.erro);
  }
}

// desativar operação e atualizar store automaticamente
export async function deleteLocalOperation(id: number, operationData: object) {
  try {
    await deleteOperation(id, operationData);

    useOperation.operations = useOperation.operations.filter((item) => {
      return item.id !== id;
    });
  } catch (error) {
    // console.log(error);
    alert(error.response.data.erro);
  }
}
