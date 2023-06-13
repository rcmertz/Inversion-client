<script setup lang="ts">
  import { Icon } from '@iconify/vue';

  defineProps<{ tipo: string; id: string }>();
</script>

<template>
  <RouterLink :to="'/carteiras/' + id" class="nav-link" active-class="nav-link active">
    <Icon icon="ooui:user-avatar" class="link-icon" />
    <p>{{ tipo }}</p>
  </RouterLink>
</template>

<style scoped>
  .nav-link {
    width: 289px;
    min-width: max-content;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 42px 30px;
    color: unset;
    text-decoration: none;
    background-color: var(--primary-alt);
    border-radius: 5px;
    transition: all 0.3s;
  }

  .nav-link:hover {
    background-color: var(--primary);
  }

  .nav-link.active {
    background-color: var(--primary);
  }

  .nav-link > p {
    font-family: var(--montserrat);
    font-size: 17px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .link-icon {
    font-size: 26px;
  }
</style>
