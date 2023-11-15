import { request } from './makeRequest';

// funções para fazer requisições nas rotas de carteira

export function registerMeta(data: object) {
  return request('/metas', {
    method: 'POST',
    data,
  });
}

export function getAllMetas() {
  return request('/metas?size=500000000', {
    method: 'GET',
  });
}

export function getSingleMeta(id: number) {
  return request(`/metas/${id}`, {
    method: 'GET',
  });
}

export function updateMeta(id: number, data: object) {
  return request(`/metas/${id}`, {
    method: 'PUT',
    data,
  });
}

export function deleteMeta(id: number, data: object) {
  return request(`/metas/desativar/${id}`, {
    method: 'PUT',
    data,
  });
}

export function getAporteMensal(id: number) {
  return request(`/metas/${id}/calcular-aporte`, {
    method: 'GET',
  });
}