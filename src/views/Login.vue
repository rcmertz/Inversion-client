<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import LoginForm from '@/components/Login/Form.vue';
</script>

<template>
  <Layout>
    <section>
      <LoginForm />
    </section>
  </Layout>
</template>

<style scoped>
  section {
    display: grid;
    place-items: center;
    height: 100vh;
  }
</style>
