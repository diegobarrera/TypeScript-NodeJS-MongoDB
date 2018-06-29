import { IUserModel } from "../models/iuser.model";

// a interface of user service
export interface IUserService {
    createUser(user: IUserModel): Promise<boolean>;
    findUser(name: string): Promise<IUserModel>;
}