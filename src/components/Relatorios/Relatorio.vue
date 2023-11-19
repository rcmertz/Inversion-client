<script setup lang="ts">
import { getLocalReports, useReports } from '@/stores/reports';
import { onMounted, computed, ref, watch } from 'vue';
import { formatCurrency } from '@/utils/formatCurrency';

// filtra relatorios ativas
const Reports = computed(() => {
    return useReports.reports.filter((item) => item.ativo);
});

const dataDe = ref('2021-06-27T23:55:10.030');
const dataAte = ref('2024-06-27T23:55:10.030');

function reset_datas() {
    getLocalReports('2021-06-27T23:55:10.030', '2024-06-27T23:55:10.030');
}

// Adiciona um watcher para cada campo de data
watch(dataDe, () => {
    getLocalReports(dataDe.value, dataAte.value);

});

watch(dataAte, () => {
    getLocalReports(dataDe.value, dataAte.value);
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
        <button type="button"
            style="float: right;margin-right: 10%;background: white;border-radius: 5px; padding: 3px; margin-top: 5px;"
            @click="reset_datas">Limpar</button>

        <table class="rwd-table" style="margin-top: 3%; border-radius: 7px">
            <tr>
                <th>Id </th>
                <th>Carteira</th>
                <th>Investimento</th>
                <th>Valor do Investimento</th>
                <!-- <th>Saldo</th> -->
                <th>Quantidade</th>
                <th>Preço Médio</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Valor</th>
            </tr>
            <tr v-for="item in Reports" :key="item.id">
                <td>{{ item.investimento.carteira.id }}</td>
                <td>{{ item.investimento.carteira.descricaoCarteira }}</td>
                <td>{{ item.investimento.nomeInvestimento }}</td>
                <td>{{ item.investimento.valorInvestimento }}</td>
                <!-- <td>{{ item.investimento.saldo }}</td> -->
                <td>{{ item.quantidade }}</td>
                <td>{{ formatCurrency(item.preco_medio) }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ new Date(item.data).toLocaleDateString('pt-BR') }}</td>
                <td>{{ formatCurrency(item.valor * item.quantidade) }}</td>
            </tr>
        </table>

        <button type="button"
            style="float: right;margin-right: 10%;background: orange;border-radius: 5px; padding: 8px;">Imprimir</button>

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