import { Reports } from "@/interfaces/reports";
import { getAllReports } from "@/services/reports";
import { reactive } from 'vue';


// store de rendimento
export const useReports = reactive({
    reports: [] as Reports[],
});

// pegar os relatorios e salvar resposta na store
export async function getLocalReports(dataDe?: string, dataAte?: string) {
    try {
        const { data } = await getAllReports(dataDe, dataAte);
        console.log(data);
        useReports.reports = data.content;
    } catch (error) {
        console.log(error);
    }
}