<script setup lang="ts">
  import NavCard from './NavCard.vue';
  import { carteiraStore } from '@/stores/carteira';

  // onMounted(() => {
  //   getCarteiras();
  // });
</script>

<template>
  <section>
    <nav v-if="carteiraStore.carteiras.length > 0">
      <NavCard v-for="item in carteiraStore.carteiras" :tipo="item.tipo" :id="item.id" />
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
