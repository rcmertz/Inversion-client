import { AbstractEntity } from "./abstract-entity";

export class Usuario extends AbstractEntity {
  nome!: string;
  cpf!: string;
  telefone!: string;
  email!: string;
  
  constructor() {
    super();
    this.ativo = true;
  }
}