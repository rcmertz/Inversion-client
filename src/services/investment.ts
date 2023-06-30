import { request } from './makeRequest';

// funções para fazer requisições nas rotas de investimentos

export function registerInvestment(data: object) {
  return request('/investimentos', {
    method: 'POST',
    data,
  });
}

export function getAllInvestments() {
  return request('/investimentos?size=500000000', {
    method: 'GET',
  });
}

export function getSingleInvestment(id: number) {
  return request(`/investimentos/${id}`, {
    method: 'GET',
  });
}

export function updateInvestment(id: number, data: object) {
  return request(`/investimentos/${id}`, {
    method: 'PUT',
    data,
  });
}

export function deleteInvestment(id: number, data: object) {
  return request(`/investimentos/desativar/${id}`, {
    method: 'PUT',
    data,
  });
}
