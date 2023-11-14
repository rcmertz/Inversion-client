import { IWallet } from '@/interfaces/wallet';
import { deleteWallet, getAllWallets, registerWallet, updateWallet } from '@/services/wallet';
import { reactive } from 'vue';
import { deleteLocalInvestment, useInvestment } from './investment';

// store de carteira
export const useWallet = reactive({
  wallets: [] as IWallet[],
});

// cadastrar carteira e atualizar a store autmaticamente
export async function registerLocalWallet(walletData: object) {
  try {
    const { data } = await registerWallet(walletData);

    useWallet.wallets.push(data);

    alert('Carteira cadastrada com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}

// pegar carteiras e salvar resposta na store
export async function getLocalWallets() {
  try {
    const { data } = await getAllWallets();

    useWallet.wallets = data.content;
  } catch (error) {
    console.log(error);
  }
}

// editar carteira e atualizar a store automaticamente
export async function updateLocalWallet(id: number, walletData: object) {
  try {
    const { data } = await updateWallet(id, walletData);

    useWallet.wallets = useWallet.wallets.map((item) => {
      if (item.id === id) {
        return { ...item, data };
      } else {
        return item;
      }
    });

    alert('Carteira atualizada com sucesso!');
  } catch (error) {
    console.log(error);
  }
}

// desativar carteira e atualizar a store automaticamente
export async function deleteLocalWallet(id: number, walletData: object) {
  try {
    const { data } = await deleteWallet(id, walletData);

    console.log(data);

    // desativar investimentos atrelados
    useInvestment.investments.forEach(async (item) => {
      if (item.carteira.id === id) {
        await deleteLocalInvestment(item.id, { ...item, ativo: false });
      }
    });

    useWallet.wallets = useWallet.wallets.filter((item) => item.id !== id);

    alert('Carteira desativada com sucesso!');
  } catch (error) {
    console.log(error);
  }
}
