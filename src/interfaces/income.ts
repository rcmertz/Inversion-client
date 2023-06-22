export interface IIncome {
  id: number;
  cadastro: string;
  atualizado: any;
  excluido: any;
  ativo: boolean;
  papel: {
    id: number;
    cadastro: string;
    carteira: {
      id: number;
      cadastro: string;
      ativo: boolean;
      descricaoCarteira: string;
      valorCarteira: number;
    };
    valor: number;
    quantidade: number;
    tipo: string;
    operacao: string;
    ativo: boolean;
  };
  preco_un: number;
  quantidade: number;
  data: string;
  descricao: string;
}
