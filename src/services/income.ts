import { request } from './makeRequest';

export function registerIncome(data: object) {
  return request('/rendimentos', {
    method: 'POST',
    data,
  });
}

export function getAllIncomes() {
  return request('/rendimentos', {
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
