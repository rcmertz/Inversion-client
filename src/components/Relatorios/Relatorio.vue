<script setup lang="ts">
import { getLocalReports, useReports } from '@/stores/reports';
import { onMounted, computed } from 'vue';

// filtra relatorios ativas
const Reports = computed(() => {
    return useReports.reports.filter((item) => item.ativo);
});

// pega carteiras quando o componente renderizar
onMounted(() => {
    getLocalReports();
});
</script>


<template>
    <div>
        <div
            style="background:white; border-radius:7px; width: 35%; display: flex; padding: 2px; margin-top: 7%; margin-left:52%">
            <h4>&nbspFiltrar de: &nbsp</h4>
            <input type="date" />
            <h4>, até: &nbsp</h4>
            <input type="date" />
        </div>
        <table class="rwd-table" style="margin-top: 3%; border-radius: 7px">
            <tr>
                <th>Número</th>
                <th>Carteira</th>
                <th>Quantidade</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Valor</th>
            </tr>
            <tr v-for="item in Reports">
                <td>{{ item.id }}</td>
                <td>{{ item.investimento.carteira.id }}</td>
                <td>{{ item.quantidade }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.data }}</td>
                <td>{{ item.valor * item.quantidade }},00 R$</td>
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