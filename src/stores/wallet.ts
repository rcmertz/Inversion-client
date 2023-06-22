import { IWallet } from '@/interfaces/wallet';
import { deleteWallet, getAllWallets, registerWallet, updateWallet } from '@/services/wallet';
import { reactive } from 'vue';

export const walletStore = reactive({
  wallets: [] as IWallet[],
});

export async function registerLocalWallet(walletData: object) {
  try {
    const { data } = await registerWallet(walletData);

    walletStore.wallets.push(data);

    alert('Carteira cadastrada com sucesso!');
  } catch (error) {
    console.log(error);
  }
}

export async function getLocalWallets() {
  try {
    const { data } = await getAllWallets();

    walletStore.wallets = data.content;
  } catch (error) {
    console.log(error);
  }
}

export async function updateLocalWallet(id: number, walletData: object) {
  try {
    const { data } = await updateWallet(id, walletData);

    walletStore.wallets = walletStore.wallets.map((item) => {
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

    walletStore.wallets = walletStore.wallets.filter((item) => item.id !== id);
  } catch (error) {
    console.log(error);
  }
}
