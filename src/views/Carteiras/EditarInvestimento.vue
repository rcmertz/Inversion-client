<script setup lang="ts">
  import InvestimentoForm from '@/components/Carteiras/Forms/InvestimentoForm.vue';
  import Layout from '@/components/Layout.vue';
</script>

<template>
  <Layout sidebar>
    <section>
      <InvestimentoForm :carteiraId="$route.params.id" />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }
</style>
