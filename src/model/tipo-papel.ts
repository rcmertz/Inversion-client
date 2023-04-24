import { AbstractEntity } from "./abstract-entity";

export class TipoPapel extends AbstractEntity {

  tipo!: string;

  constructor() {
    super();
    this.ativo = true;
  }
}