import { IWallet } from '@/interfaces/wallet';
import { deleteWallet, getAllWallets, registerWallet, updateWallet } from '@/services/wallet';
import { reactive } from 'vue';
import { deleteLocalInvestment, useInvestment } from './investment';

export const useWallet = reactive({
  wallets: [] as IWallet[],
});

export async function registerLocalWallet(walletData: object) {
  try {
    const { data } = await registerWallet(walletData);

    useWallet.wallets.push(data);

    alert('Carteira cadastrada com sucesso!');
  } catch (error) {
    console.log(error);
  }
}

export async function getLocalWallets() {
  try {
    const { data } = await getAllWallets();

    useWallet.wallets = data.content;
  } catch (error) {
    console.log(error);
  }
}

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

export async function deleteLocalWallet(id: number, walletData: object) {
  try {
    await deleteWallet(id, walletData);

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
