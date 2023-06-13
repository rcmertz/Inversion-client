<script setup lang="ts">
  import InvestimentoForm from '@/components/Investimento/Form.vue';
  import Layout from '@/components/Layout.vue';
</script>

<template>
  <Layout sidebar>
    <section>
      <InvestimentoForm />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }
</style>
