import { IMeta } from './../interfaces/meta';
import { Meta } from '@/views/Meta.vue';
import { deleteMeta, getAllMetas, registerMeta, updateMeta, getSingleMeta, getAporteMensal } from '@/services/meta';
import { reactive } from 'vue';
import { IAporte } from '@/interfaces/aporte';

// store de meta
export const useMeta = reactive({
  metas: [] as IMeta[],
  meta: undefined as IMeta | undefined,
  aporte: undefined as IAporte | undefined,
  page: 0,
  totalPages: 0,
});

// cadastrar meta e atualizar a store autmaticamente
export async function registerLocalMeta(metaData: object) {
  try {
    const { data } = await registerMeta(metaData);

    useMeta.metas.push(data);

    alert('Meta cadastrada com sucesso!');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro)
  }
}

// pegar metas e salvar resposta na store
export async function getLocalMetas() {
  try {
    const { data } = await getAllMetas();

    useMeta.metas = data.content;
  } catch (error) {
    console.log(error);
  }
}

// pegar meta e salvar na store
export async function getLocalMeta(id: number) {
    try {
      const { data } = await getSingleMeta(id);
  
      useMeta.meta = data;
    } catch (error) {
      console.log(error);
    }
  }

// editar meta e atualizar a store automaticamente
export async function updateLocalMeta(id: number, metaData: object) {
  try {
    const { data } = await updateMeta(id, metaData);

    useMeta.metas = useMeta.metas.map((item) => {
      if (item.id === id) {
        return { ...item, data };
      } else {
        return item;
      }
    });

    alert('Meta atualizada com sucesso!');
  } catch (error) {
    console.log(error);
  }
}

// desativar meta e atualizar a store automaticamente
export async function deleteLocalMeta(id: number, metaData: object) {
  try {
    await deleteMeta(id, metaData);
    
    useMeta.metas = useMeta.metas.filter((item) => item.id !== id);

    alert('Meta desativada com sucesso!');
  } catch (error) {
    console.log(error);
  }
}

export function changePage(page: number) {
  useMeta.page = page;
}

export async function getLocalMetaAporte(id: number) {
  try {
    const { data } = await getAporteMensal(id);

    useMeta.aporte = data;
  } catch (error) {
    console.log(error);
  }
}