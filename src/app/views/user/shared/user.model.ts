import { Company } from "../../company/shared/company.model";

export class User {
  constructor(
    public id?: number,
    public login?: string,
    public name?: string,
    public cpf?: string,
    public email?: string,
    public address?: string,
    public password?: string,
    public companies?: Company[]
  ) {
  }
}
