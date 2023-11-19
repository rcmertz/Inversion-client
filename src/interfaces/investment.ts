import { IIncome } from './income';
import { IOperation } from './operation';
import { IWallet } from './wallet';

export interface IInvestment {
  id: number;
  cadastro: string;
  atualizado: undefined;
  excluido: undefined;
  ativo: boolean;
  valorInvestimento: number;
  nomeInvestimento: string;
  carteira: IWallet;
  rendimentos: IIncome[];
  operacoes: IOperation[];
  saldo: number;
  data: string;
}
