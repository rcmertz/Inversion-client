import { IIncome } from './income';
import { IInvestment } from './investment';

export interface IOperation {
  id: number;
  valor: number;
  quantidade: number;
  tipo: string;
  ativo: boolean;
  investimento: IInvestment;
  cadastro: string;
  data: string;
  rendimentos: IIncome[];
}
