import { RepositoryBase } from "./RepositoryBase";
import { IUserModel, UserSchema } from "../1.Models/user";

export class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}

// don't allow inherit class UserRepository from now
Object.seal(UserRepository);