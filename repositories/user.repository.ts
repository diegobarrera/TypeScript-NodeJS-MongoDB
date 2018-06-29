import { BaseRepository } from "./base.repository";
import { IUserModel } from "../models/iuser.model";
import { UserSchema } from "../models/user.model";

export class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}

// don't allow inherit class UserRepository from now
Object.seal(UserRepository);