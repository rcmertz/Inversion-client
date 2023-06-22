import { request } from './makeRequest';

export function registerInvestment(data: object) {
  return request('/papel', {
    method: 'POST',
    data,
  });
}

export function getAllInvestments() {
  return request('/papel', {
    method: 'GET',
  });
}

export function getSingleInvestment(id: number) {
  return request(`/papel/${id}`, {
    method: 'GET',
  });
}

export function updateInvestment(id: number, data: object) {
  return request(`/papel/${id}`, {
    method: 'PUT',
    data,
  });
}

export function deleteInvestment(id: number, data: object) {
  return request(`/papel/desativar/${id}`, {
    method: 'PUT',
    data,
  });
}
