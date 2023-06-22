<script setup lang="ts">
  import SectionTitle from '@/components/SectionTitle.vue';
  import CadastroForm from '@/components/Cadastro/Form.vue';
  import Layout from '@/components/Layout.vue';
</script>

<template>
  <Layout>
    <section>
      <header>
        <SectionTitle title="Cadastro de conta" />
      </header>
      <CadastroForm />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    padding: 56px 120px;
    /* padding: 80px; */
  }

  header {
    background-color: var(--primary-alt);
    padding: 24px;
  }
</style>
