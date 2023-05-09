import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },

  {
    path: "/produto-list",
    name: "produto-list",
    component: () => import("../views/carteira/"),
  },
  {
    path: "/produto-cadastro",
    name: "produto-cadastro",
    component: () => import("../views/produto/produto-cadastro.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
