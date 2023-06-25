import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Cadastro from '@/views/Cadastro.vue';
import Carteiras from '@/views/Carteiras/index.vue';
import Carteira from '@/views/Carteiras/Carteira.vue';
import Operacao from '@/views/Operacao/index.vue';
import Rendimento from '@/views/Operacao/Rendimento.vue';
import EditarOperacao from '@/views/Operacao/EditarOperacao.vue';
import EditarRendimento from '@/views/Operacao/EditarRendimento.vue';
import { getLocalUser, useUser } from '@/stores/user';
import { useOperation } from '@/stores/operation';
import { useInvestment } from '@/stores/investment';

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
    path: '/operacao',
    name: 'Operação',
    component: Operacao,
    meta: {
      module: 'operação',
    },
  },
  {
    path: '/operacao/rendimento',
    name: 'Rendimento',
    component: Rendimento,
    meta: {
      module: 'operação',
    },
  },
  {
    path: '/operacao/editar-operacao/:id',
    name: 'Editar operação',
    component: EditarOperacao,
    meta: {
      module: 'operação',
    },
  },
  {
    path: '/operacao/editar-rendimento',
    name: 'Editar rendimento',
    component: EditarRendimento,
    meta: {
      module: 'operação',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// @ts-expect-error from não está sendo usado
router.beforeEach(async (to, from, next) => {
  useOperation.modal = false;
  useInvestment.modal = false;
  await getLocalUser();
  if (to.name !== 'Cadastro' && to.name !== 'Login') {
    if (!useUser.user) {
      router.replace('/cadastro');
    } else if (useUser.token === '') {
      router.replace('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});
