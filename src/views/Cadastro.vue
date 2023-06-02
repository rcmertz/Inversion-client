<script setup lang="ts">
  import SectionTitle from '@/components/SectionTitle.vue';
  import CadastroForm from '@/components/Cadastro/Form.vue';
</script>

<template>
  <section>
    <header>
      <SectionTitle title="Cadastro de conta" />
    </header>
    <CadastroForm />
  </section>
</template>

<style scoped>
  section {
    /* padding: 56px; */
    padding: 80px;
  }

  header {
    background-color: var(--primary-alt);
    padding: 33px 36px;
  }
</style>
