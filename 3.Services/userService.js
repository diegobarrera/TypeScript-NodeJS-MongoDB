"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise = require("promise");
class UserService {
    constructor(UserRepo) {
        this._UserRepo = UserRepo;
    }
    createUser(user) {
        let p = new promise((resolve, reject) => {
            let User = {
                name: user.name,
                age: user.age,
                address: user.address,
                phone: user.phone,
            };
            this._UserRepo.create(User, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        return p;
    }
    findUser(name) {
        let p = new promise((resolve, reject) => {
            this._UserRepo.find({ name: name }).sort({ createdAt: -1 }).limit(1).exec((err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (res.length) {
                        resolve(res[0]);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });
        return p;
    }
}
exports.UserService = UserService;
Object.seal(UserService);
//# sourceMappingURL=userService.js.map