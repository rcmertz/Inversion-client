<script setup lang="ts">
import Relatorio from '@/components/Relatorios/Relatorio.vue'
import Layout from '@/components/Layout.vue';
import OperacaoModal from '@/components/Operacao/Modal.vue';
import { useOperation } from '@/stores/operation';
</script>

<template>
    <Layout sidebar>
        <OperacaoModal v-if="useOperation.modal" />
        <section>
            <Relatorio></Relatorio>
        </section>
    </Layout>
</template>
  
  