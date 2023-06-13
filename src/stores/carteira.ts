import { tableBody } from '@/data/carteira';
import { ICarteira } from '@/interfaces/carteira';
import { IInvestimento } from '@/interfaces/investimento';
import { reactive } from 'vue';

export const carteiraStore = reactive({
  carteiras: [] as ICarteira[],
  investimentos: tableBody,
});

export async function registerCarteira(carteira: string) {
  try {
    carteiraStore.carteiras.push({
      id: (carteiraStore.carteiras.length + 1).toString(),
      tipo: carteira,
      descricao: '',
      valor: 0,
    });
  } catch (error) {
    console.log(error);
  }
}

interface IUpdateInvestimento {
  id: string | string[];
  investimento: IInvestimento;
}

export async function updateInvestimento({ id, investimento }: IUpdateInvestimento) {
  try {
    carteiraStore.investimentos = carteiraStore.investimentos.map((item) => {
      if (item.id === id) {
        // return data.investimento
        return investimento;
      } else {
        return item;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteInvestimento(id: string) {
  try {
    carteiraStore.investimentos = carteiraStore.investimentos.filter((item) => item.id !== id);
  } catch (error) {
    console.log(error);
  }
}

// export async function getCarteiras() {
//   carteiraStore.carteiras = data
// }
