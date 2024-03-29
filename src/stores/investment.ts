import { IInvestment } from '@/interfaces/investment';
import { router } from '@/routes/routes';
import {
  deleteInvestment,
  updateInvestment,
  registerInvestment,
  getAllInvestments,
  getSingleInvestment,
} from '@/services/investment';
import { reactive } from 'vue';
import { deleteLocalOperation, getLocalOperations, useOperation } from './operation';

// store de investimento
export const useInvestment = reactive({
  investments: [] as IInvestment[],
  investment: null as IInvestment | null,
  modal: false,
});

// pegar investimentos e salvar resposta na store
export async function getLocalInvestmentsOnly() {
  try {
    const { data } = await getAllInvestments();

    useInvestment.investments = data.content;
  } catch (error) {
    console.log(error);
  }
}

// pegar investimentos e operações atreladas e salvar resposta na store
export async function getLocalInvestments() {
  try {
    const { data } = await getAllInvestments();
    await getLocalOperations();

    data.content.map((item: IInvestment) => {
      item.operacoes = useOperation.operations?.filter((operation) => {
        return operation.ativo && item.id === operation.investimento.id;
      });
    });

    useInvestment.investments = data.content;
  } catch (error) {
    console.log(error);
  }
}

// pegar investimento e salvar resposta na store
export async function getLocalInvestment(id: number) {
  try {
    const { data } = await getSingleInvestment(id);

    useInvestment.investment = data;
  } catch (error) {
    console.log(error);
  }
}

// cadastrar investimento e atualizar a store automaticamente
export async function registerLocalInvestment(investmentData: object) {
  try {
    const { data } = await registerInvestment(investmentData);

    useInvestment.investments.push(data);

    alert('Investimento cadastrado com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(
      error.response.status === 400
        ? 'Investimento já cadastrado, tente novamente.'
        : 'Ocorreu um erro ao cadastrar investimento, tente novamente mais tarde.'
    );
  }
}

// editar investimento e atualizar a store automaticamente
export async function updateLocalInvestment(id: number, investmentData: object) {
  try {
    const { data } = await updateInvestment(id, investmentData);

    useInvestment.investments = useInvestment.investments.map((item) => {
      if (item.id === id) {
        return { ...item, data };
      } else {
        return item;
      }
    });

    alert('Investimento atualizado com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}

// desativar investimento e atualizar a store automaticamente
export async function deleteLocalInvestment(id: number, investmentData: object) {
  try {
    await deleteInvestment(id, investmentData);

    // desativar operações atreladas
    useOperation.operations.forEach(async (item) => {
      if (item.investimento.id === id) {
        await deleteLocalOperation(item.id, { ...item, ativo: false });
      }
    });

    useInvestment.investments = useInvestment.investments.filter((item) => item.id !== id);

    await router.push('/carteiras');

    location.reload();
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}
