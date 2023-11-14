<script setup lang="ts">
  import { getLocalMetas, useMeta } from '@/stores/meta';
  import NavCard from './NavCard.vue';
  import { computed, onMounted } from 'vue';
  import { Icon } from '@iconify/vue';

  // filtra metas ativas
  const activeMetas = computed(() => {
    return useMeta.metas.filter((item) => item.ativo);
  });

  // pega metas quando componente renderizar
  onMounted(() => {
    getLocalMetas();
  });
</script>


<template>
    <section>
        <nav v-if="activeMetas.length > 0">
            <NavCard v-for="item in activeMetas" :item="item" :key="item.id" />
        </nav>
        <h1 v-else>0 metas cadastradas...</h1>

        <div class="line"></div>

        <div class="container">
            <RouterLink :to="'/metas/cadastro'" class="button open-modal" active-class="button active">
                <Icon icon="ooui:flag-ltr" class="link-icon" />
                <p>Cadastrar Meta</p>
            </RouterLink>
        </div>

        <slot></slot>
  </section>
</template>

<style scoped>
  section {
    padding: 52px;
  }

  nav {
    display: flex;
    width: 1715px;
    overflow-x: auto;
    gap: 72px;
    margin-bottom: 56px;
  }

  .line {
    background-color: #e5e5e5;
    height: 1px;
    width: 100%;
    margin-bottom: 40px;
  }

  h1 {
    color: #fff;
    font-size: 48px;
    font-weight: 600;
    margin-bottom: 56px;
    line-height: 110px;
  }

  .button {
    background-color: var(--primary-alt);
    font-family: var(--inter);
    font-weight: 500;
    font-size: 17px;
    text-transform: uppercase;
    border-radius: 8px;
    padding: 16px 0;
    cursor: pointer;
  }

  .button:visited {
    color: black;
  }

  .open-modal {
    width: 303px;
    min-width: max-content;
    height: 114px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 42px 30px;
    background-color: var(--primary-alt);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none !important;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 60vh;
  }
</style>