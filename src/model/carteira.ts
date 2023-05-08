import { AbstractEntity } from "./abstract-entity";

export class Carteira extends AbstractEntity {
  descricao!: string;
  valor!: number;
  tipo!: string;

  constructor() {
    super();
    this.ativo = true;
  }
}