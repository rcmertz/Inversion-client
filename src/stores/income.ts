import { IIncome } from '@/interfaces/income';
import { router } from '@/routes/routes';
import { deleteIncome, getAllIncomes, registerIncome, updateIncome } from '@/services/income';
import { reactive } from 'vue';

// store de rendimento
export const useIncome = reactive({
  incomes: [] as IIncome[],
});

// pegar rendimentos e salvar resposta na store
export async function getLocalIncomes() {
  try {
    const { data } = await getAllIncomes();

    useIncome.incomes = data.content;
  } catch (error) {
    console.log(error);
  }
}

// cadastrar rendimento e atualizar a store automaticamente
export async function registerLocalIncome(incomeData: object) {
  try {
    const { data } = await registerIncome(incomeData);

    useIncome.incomes.push(data);

    alert('Rendimento cadastrado com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}

// editar rendimento e atualizar a store automaticamente
export async function updateLocalIncome(id: number, incomeData: object) {
  try {
    const { data } = await updateIncome(id, incomeData);

    useIncome.incomes = useIncome.incomes.map((item) => {
      if (item.id === id) {
        return { ...item, data };
      } else {
        return item;
      }
    });

    alert('Rendimento atualizado com sucesso!');
    router.push('/carteiras');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}

// desativar rendimento e atualizar a store automaticamente
export async function deleteLocalIncome(id: number, incomeData: object) {
  try {
    await deleteIncome(id, incomeData);

    useIncome.incomes = useIncome.incomes.filter((item) => item.id !== id);

    alert('Rendimento desativado com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}
