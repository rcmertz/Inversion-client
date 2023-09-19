<script setup lang="ts">
import AprendaMais from '@/components/AprendaMais/Layout.vue';
import Layout from '@/components/Layout.vue';
import OperacaoModal from '@/components/Operacao/Modal.vue';
import { useOperation } from '@/stores/operation';
</script>

<template>
    <Layout sidebar>
        <OperacaoModal v-if="useOperation.modal" />
        <section>
            <AprendaMais></AprendaMais>
        </section>
    </Layout>
</template>
  
  