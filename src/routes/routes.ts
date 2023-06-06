import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Cadastro from '@/views/Cadastro.vue';
import Investimento from '@/views/Investimento/index.vue';
import Rendimento from '@/views/Investimento/Rendimento.vue';
import Carteira from '@/views/Carteira/index.vue';
import RendaFixa from '@/views/Carteira/RendaFixa.vue';
import Criptomoeda from '@/views/Carteira/Criptomoeda.vue';
import RendaVariavel from '@/views/Carteira/RendaVariavel.vue';

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
  {
    path: '/investimento',
    component: Investimento,
  },
  {
    path: '/investimento/rendimento',
    component: Rendimento,
  },
  {
    path: '/carteira',
    component: Carteira,
  },
  {
    path: '/carteira/renda-fixa',
    component: RendaFixa,
  },
  {
    path: '/carteira/criptomoeda',
    component: Criptomoeda,
  },
  {
    path: '/carteira/renda-variavel',
    component: RendaVariavel,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
