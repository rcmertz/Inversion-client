<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import Criar from '@/components/Operacao/Rendimento/Criar.vue';
</script>

<template>
  <Layout sidebar>
    <section>
      <Criar />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }
</style>
