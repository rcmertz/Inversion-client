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
  preco_medio: number;
  rendimentos: IIncome[];
}

export interface IGetOperations {
  size: number;
  carteira: number;
}

export interface IGetOperationsByInvestment {
  size: number;
  id: number;
}

export interface IGetOperationsByDate {
  size: number;
  carteira: number;
  start: string;
  end: string;
}

export interface IGetOperationsByDateAndInvestment {
  size: number;
  id: number;
  start: string;
  end: string;
}
