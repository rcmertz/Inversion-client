<script setup lang="ts">
  import { useUser } from '@/stores/user';
  import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="header">
    <Icon icon="ooui:user-avatar" class="icon" />
    <h5 v-if="useUser.user">{{ useUser.user.nome }}</h5>
    <h5 v-else>name@gmail.com</h5>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 42px 30px;
    background-color: var(--primary-alt);
    border-radius: 5px;
    margin-bottom: 53px;
  }

  .icon {
    font-size: 26px;
  }

  h5 {
    font-family: var(--montserrat);
    font-size: 17px;
    font-weight: 500;
  }
</style>
