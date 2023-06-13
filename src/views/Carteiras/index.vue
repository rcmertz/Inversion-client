<script setup lang="ts">
  import LayoutCarteira from '@/components/Carteiras/Layout.vue';
  import ModalCadastro from '@/components/Carteiras/ModalCadastro.vue';
  import Layout from '@/components/Layout.vue';
</script>

<template>
  <Layout sidebar>
    <LayoutCarteira>
      <div class="container">
        <ModalCadastro />
      </div>
    </LayoutCarteira>
  </Layout>
</template>

<style scoped>
  .container {
    display: grid;
    justify-items: center;
    align-items: flex-end;
    height: calc(100vh - 330px);
  }
</style>
