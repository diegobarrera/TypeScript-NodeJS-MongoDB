import RepositoryBase = require('../2.Repositories/RepositoryBase');
import UserModel = require('../1.Models/user');

export class UserRepository extends RepositoryBase.RepositoryBase<UserModel.IUserModel> {
  constructor() {
    super(UserModel.UserSchema);
  }
}

// don't allow inherit class UserRepository from now
Object.seal(UserRepository);