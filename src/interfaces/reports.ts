import { IUser } from './user';
import { IInvestment } from './investment';


export interface Reports {
    id: number;
    cadastro: string;
    atualizado: any;
    excluido: any;
    ativo: boolean;
    usuario: IUser;
    investimento: IInvestment;
    valor: number,
    quantidade: number,
    data: Date,
    tipo: string,
    preco_medio: number,
}