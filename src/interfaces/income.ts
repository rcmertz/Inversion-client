import { IInvestment } from './investment';
import { IOperation } from './operation';

export interface IIncome {
  id: number;
  cadastro: string;
  atualizado: any;
  excluido: any;
  ativo: boolean;
  investimento: IInvestment;
  preco_un: number;
  quantidade: number;
  data: string;
  descricao: string;
  operacao: IOperation;
}
