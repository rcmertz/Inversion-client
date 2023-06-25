import { request } from './makeRequest';

export function registerInvestment(data: object) {
  return request('/investimentos', {
    method: 'POST',
    data,
  });
}

export function getAllInvestments() {
  return request('/investimentos', {
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
