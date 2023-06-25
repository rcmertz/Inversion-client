<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import OperacaoForm from '@/components/Operacao/Form.vue';
  import OperacaoModal from '@/components/Operacao/Modal.vue';
  import { useOperation } from '@/stores/operation';
</script>

<template>
  <Layout sidebar>
    <OperacaoModal v-if="useOperation.modal" />
    <section>
      <OperacaoForm />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 52px;
  }
</style>
