import { IInvestment } from '@/interfaces/investment';
import {
  deleteInvestment,
  updateInvestment,
  registerInvestment,
  getAllInvestments,
  getSingleInvestment,
} from '@/services/investment';
import { reactive } from 'vue';
import { getLocalIncomes, incomeStore } from './income';

export const investmentStore = reactive({
  investments: [] as IInvestment[],
  investment: null as IInvestment | null,
});

export async function getLocalInvestments() {
  try {
    const { data } = await getAllInvestments();
    await getLocalIncomes();

    await data.content.map((item: IInvestment) => {
      item.rendimentos = incomeStore.incomes;
    });

    investmentStore.investments = data.content;
  } catch (error) {
    console.log(error);
  }
}

export async function getLocalInvestment(id: number) {
  try {
    const { data } = await getSingleInvestment(id);

    investmentStore.investment = data;
  } catch (error) {
    console.log(error);
  }
}

export async function registerLocalInvestment(investmentData: object) {
  try {
    const { data } = await registerInvestment(investmentData);

    investmentStore.investments.push(data);

    alert('Investimento cadastrado com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}

export async function updateLocalInvestment(id: number, investmentData: object) {
  try {
    const { data } = await updateInvestment(id, investmentData);

    investmentStore.investments = investmentStore.investments.map((item) => {
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

export async function deleteLocalInvestment(id: number, investmentData: object) {
  try {
    await deleteInvestment(id, investmentData);

    investmentStore.investments = investmentStore.investments.filter((item) => item.id !== id);

    alert('Investimento deletado com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}
