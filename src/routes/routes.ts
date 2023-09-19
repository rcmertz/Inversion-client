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
import AprendaMais from '@/views/AprendaMais.vue';
import { getLocalUser, useUser } from '@/stores/user';
import { useOperation } from '@/stores/operation';
import { useInvestment } from '@/stores/investment';

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
    path: '/operacao',
    name: 'Operação',
    component: Operacao,
  },
  {
    path: '/operacao/rendimento',
    name: 'Rendimento',
    component: Rendimento,
  },
  {
    path: '/operacao/editar-operacao/:id',
    name: 'Editar operação',
    component: EditarOperacao,
  },
  {
    path: '/aprendamais',
    name: 'Aprenda Mais',
    component: AprendaMais,
  },
  {
    path: '/operacao/editar-rendimento',
    name: 'Editar rendimento',
    component: EditarRendimento,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// antes de cada navegação, verifica se tem usuário logado e
// e se há um token válido

// @ts-expect-error from não está sendo usado
router.beforeEach(async (to, from, next) => {
  useOperation.modal = false;
  useInvestment.modal = false;
  useOperation.page = 0;
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
