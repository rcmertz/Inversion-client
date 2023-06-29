import { request } from './makeRequest';

export function registerOperation(data: object) {
  return request('/operacao', {
    method: 'POST',
    data,
  });
}

export function getAllOperations() {
  return request('/operacao/findAll?size=500000000', {
    method: 'GET',
  });
}

export function getSingleOperation(id: number) {
  return request(`/operacao/${id}`, {
    method: 'GET',
  });
}

export function getOperationsByWallet(size: number, page: number, carteira: number) {
  return request(`/operacao/listar?size=${size}&page=${page}&carteira=${carteira}`, {
    method: 'GET',
  });
}

export function getOperationsByInvestment(size: number, page: number, id: number) {
  return request(`/operacao/find?size=${size}&page=${page}&investimentoId=${id}`, {
    method: 'GET',
  });
}

export function getOperationsByDate(
  size: number,
  page: number,
  carteira: number,
  start: string,
  end: string
) {
  return request(
    `/operacao/listar?size=${size}&page=${page}&carteira=${carteira}&dataStart=${start}&dataEnd=${end}`,
    {
      method: 'GET',
    }
  );
}

export function getOperationsByDateAndInvestment(
  size: number,
  page: number,
  id: number,
  start: string,
  end: string
) {
  return request(
    `/operacao/find?size=${size}&page=${page}&investimentoId=${id}&dataStart=${start}&dataEnd=${end}`,
    {
      method: 'GET',
    }
  );
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
