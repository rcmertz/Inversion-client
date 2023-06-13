<script setup lang="ts">
  import Layout from '@/components/Layout.vue';
  import LayoutCarteira from '@/components/Carteiras/Layout.vue';
  import Table from '@/components/Carteiras/Table.vue';
  import { carteiraStore } from '@/stores/carteira';
  // import { onMounted } from 'vue-router';
  // import { ref } from 'vue';

  // const tableData = ref([]);

  // onMounted(() => {
  //   getTableData();
  // });
</script>

<template>
  <Layout sidebar>
    <LayoutCarteira>
      <Table :tableData="carteiraStore.investimentos" />
    </LayoutCarteira>
  </Layout>
</template>

<style scoped></style>
