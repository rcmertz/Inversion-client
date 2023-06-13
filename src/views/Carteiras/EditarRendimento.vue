<script setup lang="ts">
  import RendimentoForm from '@/components/Carteiras/Forms/RendimentoForm.vue';
  import Layout from '@/components/Layout.vue';
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
