import { AbstractEntity } from "./abstract-entity";

export class Dividendo extends AbstractEntity{
    preco!: number;
    quantidade!: number;
    data!: Date;
    descricao!: string;

    constructor() {
        super();
        this.ativo = true;
    }
}