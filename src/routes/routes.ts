import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Cadastro from '@/views/Cadastro.vue';
import Investimento from '@/views/Investimento/index.vue';
import Rendimento from '@/views/Investimento/Rendimento.vue';
import Carteiras from '@/views/Carteiras/index.vue';
import Carteira from '@/views/Carteiras/Carteira.vue';
import EditarInvestimento from '@/views/Carteiras/EditarInvestimento.vue';
import EditarRendimento from '@/views/Carteiras/EditarRendimento.vue';
// import { userStore } from '@/stores/user';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
  },
  {
    path: '/investimento',
    name: 'Investimento',
    component: Investimento,
  },
  {
    path: '/investimento/rendimento',
    name: 'Rendimento',
    component: Rendimento,
  },
  {
    path: '/carteiras',
    name: 'Carteiras',
    component: Carteiras,
  },
  {
    path: '/carteiras/:id',
    name: 'Carteira',
    component: Carteira,
  },
  {
    path: '/carteiras/editar-investimento/:id',
    name: 'Editar investimento',
    component: EditarInvestimento,
  },
  {
    path: '/carteiras/editar-rendimento/:id',
    name: 'Editar rendimento',
    component: EditarRendimento,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, _from, next) => {
//   if (to.name !== 'Cadastro' && to.name !== 'Login') {
//     if (userStore.user) {
//       next();
//     } else {
//       router.push('/login');
//     }
//   } else {
//     next();
//   }
// });
