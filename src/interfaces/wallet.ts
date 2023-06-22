export interface IWallet {
  id: number;
  descricaoCarteira: string;
  valorCarteira: number;
  ativo: boolean;
  cadastro: string;
  atualizado?: any;
  excluido?: any;
}
