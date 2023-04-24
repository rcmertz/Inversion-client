import { AbstractEntity } from "./abstract-entity";
import { TipoPapel } from "./tipo-papel";

export class Papel extends AbstractEntity {
  data!: string;
  valor!: number;
  quantidade!: string;
  tipopapel!: TipoPapel;

  constructor() {
    super();
    this.ativo = true;
  }
}