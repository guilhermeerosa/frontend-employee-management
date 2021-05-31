import { User } from "../../user/shared/user.model";

export class Company {
    constructor(
    public id?: number,
    public name?: string,
    public cnpj?: string,
    public address?: string,
    public users?: User[]
    ){
    }
}