import { IUserModel } from "../models/iuser.model";
import { BaseRepository } from "../repositories/base.repository";
import { UserSchema } from "../models/user.model";

export class UserRepositoryMock extends BaseRepository<IUserModel> {
    constructor() {
        super(UserSchema);
    }

    create(item: IUserModel, callback: (error: any, result: IUserModel) => void): void {
        callback(null, item);
    }

}