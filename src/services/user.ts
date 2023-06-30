import { request } from './makeRequest';

// funções para fazer requisições nas rotas de usuário

export function register(data: object) {
  return request('/usuarios/cadastro', {
    method: 'POST',
    data,
  });
}

export function login(data: object) {
  return request('/usuarios/login', {
    method: 'POST',
    data,
  });
}

export function getCurrentUser() {
  return request('/usuarios/me', {
    method: 'GET',
  });
}

export function getAllUsers() {
  return request('/usuarios', {
    method: 'GET',
  });
}

export function getSingleUser(id: number) {
  return request(`/usuarios/${id}`, {
    method: 'GET',
  });
}

export function updateUser(id: number, data: object) {
  return request(`/usuarios/${id}`, {
    method: 'PUT',
    data,
  });
}

export function logout(id: number, data: object) {
  return request(`/usuarios/desativar/${id}`, {
    method: 'PUT',
    data,
  });
}
