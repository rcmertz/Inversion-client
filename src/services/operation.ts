import { request } from './makeRequest';

export function registerOperation(data: object) {
  return request('/operacao', {
    method: 'POST',
    data,
  });
}

export function getAllOperations() {
  return request('/operacao', {
    method: 'GET',
  });
}

export function getSingleOperation(id: number) {
  return request(`/operacao/${id}`, {
    method: 'GET',
  });
}

export function updateOperation(id: number, data: object) {
  return request(`/operacao/${id}`, {
    method: 'PUT',
    data,
  });
}

export function deleteOperation(id: number, data: object) {
  return request(`/operacao/desativar/${id}`, {
    method: 'PUT',
    data,
  });
}
