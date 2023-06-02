<script setup lang="ts">
  import Sidebar from './components/Sidebar.vue';
  import { isOpen } from './stores/sidebar';
  import { onMounted } from 'vue';
  import { userStore } from './stores/user';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  onMounted(() => {
    if (!userStore.user) {
      router.push('/login');
    }
  });
</script>

<template>
  <Sidebar />

  <div :class="isOpen ? 'slot open' : 'slot'">
    <RouterView />
  </div>
</template>

<style scoped>
  .slot {
    margin-left: 102px;
    transition: all 0.3s;
  }

  .slot.open {
    margin-left: 378px;
  }
</style>
