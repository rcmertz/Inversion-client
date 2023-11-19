import { useUser } from '@/stores/user';
import axios, { AxiosRequestConfig } from 'axios';

// cria função para realizar requisições com axios
// e determina uma url de base
export const api = axios.create({
  baseURL: 'http://localhost:5850/api',
});

// função para realizar requisições
export async function request(url: string, options?: AxiosRequestConfig) {
  // antes de cada requisição, verifica se há um token
  // no header Authorization
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${useUser.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return await api(url, options);
}
