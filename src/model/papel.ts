import { AbstractEntity } from "./abstract-entity";
import { TipoPapel } from "./tipoPapel";

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