import { request } from './makeRequest';

// funções para fazer requisições nas rotas de rendimentos

export function registerIncome(data: object) {
  return request('/rendimentos', {
    method: 'POST',
    data,
  });
}

export function getAllIncomes() {
  return request('/rendimentos?size=500000000', {
    method: 'GET',
  });
}

export function getSingleIncome(id: number) {
  return request(`/rendimentos/${id}`, {
    method: 'GET',
  });
}

export function updateIncome(id: number, data: object) {
  return request(`/rendimentos/${id}`, {
    method: 'PUT',
    data,
  });
}

export function deleteIncome(id: number, data: object) {
  return request(`/rendimentos/desativar/${id}`, {
    method: 'PUT',
    data,
  });
}
