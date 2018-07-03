import { IUserModel } from "../models/iuser.model";
import { Observable } from "rxjs";

// a interface of user service
export interface IUserService {
    createUser(user: IUserModel): Observable<boolean>;
    findUser(name: string): Observable<IUserModel>;
}