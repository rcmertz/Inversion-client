<script setup lang="ts">
import { getLocalReports, useReports } from '@/stores/reports';
import { onMounted, computed, ref, watch } from 'vue';

// filtra relatorios ativas
const Reports = computed(() => {
    return useReports.reports.filter((item) => item.ativo);
});

const dataDe = ref('2021-06-27T23:55:10.030');
const dataAte = ref('2024-06-27T23:55:10.030');

// Adiciona um watcher para cada campo de data
watch(dataDe, () => {
    getLocalReports(dataDe.value, dataAte.value);
    // debugger;

});

watch(dataAte, () => {
    getLocalReports(dataDe.value, dataAte.value);
    // debugger;
});

// pega carteiras quando o componente renderizar
onMounted(() => {
    getLocalReports(dataDe.value, dataAte.value);
});
</script>



<template>
    <div>
        <div
            style="background:white; border-radius:7px; width: 40%; display: flex; padding: 2px; margin-top: 7%; margin-left:50%">
            <h4>&nbspFiltrar de: &nbsp</h4>
            <input type="datetime-local" v-model="dataDe" />
            <h4>, até: &nbsp</h4>
            <input type="datetime-local" v-model="dataAte" />

        </div>
        <!-- <button type="button" style="float: right;margin-right: 9%;background: white;border-radius: 5px;">Filtrar</button> -->

        <table class="rwd-table" style="margin-top: 3%; border-radius: 7px">
            <tr>
                <th>Número</th>
                <th>Carteira</th>
                <th>Quantidade</th>
                <th>Preço Médio</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Valor</th>
            </tr>
            <tr v-for="item in Reports" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.investimento.carteira.id }}</td>
                <td>{{ item.quantidade }}</td>
                <td>{{ item.preco_medio }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ new Date(item.data).toLocaleDateString('pt-BR') }}</td>
                <td>R$ {{ item.valor * item.quantidade }}</td>
            </tr>

        </table>
    </div>
</template>
  

<style scoped>
.rwd-table {
    background: #eeeeee;
    border-collapse: collapse;
    font-size: 16px;
    line-height: 24px;
    margin: 20px auto;
    text-align: left;
    width: 80%;
    border: 0px;
}

.rwd-table th {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-weight: bold;
    padding: 10px 15px;
    position: relative;
    text-shadow: 0 1px 0 #000;
    border-bottom: 3px solid #B0BEC5;
}

.rwd-table td {
    border-right: 0px solid #fff;
    border-left: 0px solid #e8e8e8;
    border-top: 0px solid #fff;
    border-bottom: 0px solid #e8e8e8;
    padding: 10px 15px;
    position: relative;
    transition: all 300ms;
}

.rwd-table tbody:hover td {
    color: transparent;
    text-shadow: 0 0 3px #aaa;
}

.rwd-table tbody:hover tr:hover td {
    color: #444;
    text-shadow: 0 1px 0 #fff;
}

html {
    font-family: 'Lato', sans-serif;
    background: #222;

}
</style>