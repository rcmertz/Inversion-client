<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import Editar from '@/components/Operacao/Editar.vue';
  import InvestimnetoModal from '@/components/Operacao/Investimento/Modal.vue';
  import { useOperation } from '@/stores/operation';
</script>

<template>
  <Layout sidebar>
    <InvestimnetoModal v-if="useOperation.modal" />
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
