import { IWallet } from "./wallet";

export interface IMeta {
    id: number;
    descricaoMeta: string;
    rentabilidade: number;
    valorMeta: number;
    carteira: IWallet;
    ativo: boolean;
    dataMeta: any;
    cadastro: any;
    atualizado?: any;
    excluido?: any;
  }