import { AbstractEntity } from "./abstract-entity";

export class Carteira extends AbstractEntity {
  descricao!: string;
  tipo!: string;
  valor!: number;

  constructor() {
    super();
    this.ativo = true;
  }
}