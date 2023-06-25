<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import Editar from '@/components/Operacao/Rendimento/Editar.vue';
</script>

<template>
  <Layout sidebar>
    <section>
      <Editar />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }
</style>
