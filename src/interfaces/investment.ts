export interface IInvestment {
  id: number;
  cadastro: string;
  atualizado: undefined;
  excluido: undefined;
  ativo: boolean;
  valor: number;
  quantidade: number;
  tipo: string;
  operacao: string;
  carteira: {
    id: number;
    descricaoCarteira: string;
    cadastro: string;
    ativo: boolean;
  };
  rendimentos: {
    id: number;
    cadastro: string;
    atualizado: any;
    excluido: any;
    ativo: boolean;
    preco_un: number;
    quantidade: number;
    data: string;
    descricao: string;
    papel: {
      id: number;
    };
  }[];
}
