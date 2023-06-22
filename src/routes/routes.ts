import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Cadastro from '@/views/Cadastro.vue';
import Investimento from '@/views/Investimento/index.vue';
import Rendimento from '@/views/Investimento/Rendimento.vue';
import Carteiras from '@/views/Carteiras/index.vue';
import Carteira from '@/views/Carteiras/Carteira.vue';
import EditarInvestimento from '@/views/Investimento/EditarInvestimento.vue';
import EditarRendimento from '@/views/Investimento/EditarRendimento.vue';
import { getLocalUser, userStore } from '@/stores/user';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      module: 'dashboard',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      module: 'autenticação',
    },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    meta: {
      module: 'autenticação',
    },
  },
  {
    path: '/investimento',
    name: 'Investimento',
    component: Investimento,
    meta: {
      module: 'investimento',
    },
  },
  {
    path: '/investimento/rendimento',
    name: 'Rendimento',
    component: Rendimento,
    meta: {
      module: 'investimento',
    },
  },
  {
    path: '/carteiras',
    name: 'Carteiras',
    component: Carteiras,
    meta: {
      module: 'carteiras',
    },
  },
  {
    path: '/carteiras/:id',
    name: 'Carteira',
    component: Carteira,
    meta: {
      module: 'carteiras',
    },
  },
  {
    path: '/investimento/editar-investimento/:id',
    name: 'Editar investimento',
    component: EditarInvestimento,
    meta: {
      module: 'investimento',
    },
  },
  {
    path: '/investimento/editar-rendimento/:id',
    name: 'Editar rendimento',
    component: EditarRendimento,
    meta: {
      module: 'investimento',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// @ts-expect-error Erro
router.beforeEach(async (to, from, next) => {
  await getLocalUser();
  if (to.name !== 'Cadastro' && to.name !== 'Login') {
    if (!userStore.user) {
      router.replace('/cadastro');
    } else if (userStore.token === '') {
      router.replace('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});
