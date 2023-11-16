import { Reports } from "@/interfaces/reports";
import { getAllReports } from "@/services/reports";
import { reactive } from 'vue';


// store de rendimento
export const useReports = reactive({
    reports: [] as Reports[],
});

// pegar os relatorios e salvar resposta na store
export async function getLocalReports() {
    try {
        const { data } = await getAllReports();
        // console.log(data);
        useReports.reports = data.content;
    } catch (error) {
        console.log(error);
    }
}