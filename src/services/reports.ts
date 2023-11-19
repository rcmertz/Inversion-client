import { request } from './makeRequest';

// funções para fazer requisições nas rotas de relatorios

export function getAllReports() {
    return request('/operacao/relatorio?size=500000000', {
        method: 'GET',
    });
}

