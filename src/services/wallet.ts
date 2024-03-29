import { request } from './makeRequest';

// funções para fazer requisições nas rotas de carteira

export function registerWallet(data: object) {
  return request('/carteiras', {
    method: 'POST',
    data,
  });
}

export function getAllWallets() {
  return request('/carteiras?size=500000000', {
    method: 'GET',
  });
}

export function getSingleWallet(id: number) {
  return request(`/carteiras/${id}`, {
    method: 'GET',
  });
}

export function updateWallet(id: number, data: object) {
  return request(`/carteiras/${id}`, {
    method: 'PUT',
    data,
  });
}

export function deleteWallet(id: number, data: object) {
  return request(`/carteiras/desativar/${id}`, {
    method: 'PUT',
    data,
  });
}
