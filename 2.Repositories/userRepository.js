"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryBase_1 = require("./RepositoryBase");
const user_1 = require("../1.Models/user");
class UserRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super(user_1.UserSchema);
    }
}
exports.UserRepository = UserRepository;
Object.seal(UserRepository);
//# sourceMappingURL=userRepository.js.map