import { AbstractEntity } from "./abstract-entity";

export class Operacao extends AbstractEntity{
    valor!: string;
    data!: Date;
    // tipoOperacao!: TipoOperacao;
}