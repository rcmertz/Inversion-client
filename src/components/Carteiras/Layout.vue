<script setup lang="ts">
  import { getLocalWallets, walletStore } from '@/stores/wallet';
  import NavCard from './NavCard.vue';
  import { computed, onMounted } from 'vue';

  const activeWallets = computed(() => {
    return walletStore.wallets.filter((item) => item.ativo);
  });

  onMounted(() => {
    getLocalWallets();
  });
</script>

<template>
  <section>
    <nav v-if="activeWallets.length > 0">
      <NavCard v-for="item in activeWallets" :="item" />
    </nav>
    <h1 v-else>0 carteiras cadastradas...</h1>

    <div class="line"></div>

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
</style>
