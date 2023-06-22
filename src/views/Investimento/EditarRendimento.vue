<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import RendimentoForm from '@/components/Rendimento/Editar/RendimentoForm.vue';
</script>

<template>
  <Layout sidebar>
    <section>
      <RendimentoForm :carteiraId="$route.params.id" />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }
</style>
