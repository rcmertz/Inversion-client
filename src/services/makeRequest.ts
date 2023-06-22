import { userStore } from '@/stores/user';
import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export async function request(url: string, options?: AxiosRequestConfig) {
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${userStore.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return await api(url, options);
}
