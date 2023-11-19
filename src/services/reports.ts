import { request } from './makeRequest';

// funções para fazer requisições nas rotas de relatorios

export function getAllReports(dataDe?: string, dataAte?: string) {
    const queryString = `?size=500000000&page=0&dataStart=${dataDe}&dataEnd=${dataAte}`;


    // console.log();
    return request(`/operacao/relatorio${queryString}`, {
        method: 'GET',
    });
}

