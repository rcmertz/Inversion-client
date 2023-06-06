<script setup lang="ts">
  import { navLinks } from '@/data/carteira';
  import NavCard from './NavCard.vue';
</script>

<template>
  <section>
    <nav>
      <NavCard v-for="item in navLinks" :key="item.id" :item="item" />
    </nav>

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
</style>
