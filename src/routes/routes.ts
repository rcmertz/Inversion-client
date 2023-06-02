import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Cadastro from '@/views/Cadastro.vue';

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/cadastro',
    component: Cadastro,
  },
  //SEGUIR ESSE PADRAO
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
