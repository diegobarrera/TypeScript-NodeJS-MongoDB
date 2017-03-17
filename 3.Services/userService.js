"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise = require("promise");
var UserService = (function () {
    function UserService(UserRepo) {
        this._UserRepo = UserRepo;
    }
    UserService.prototype.createUser = function (user) {
        var _this = this;
        var p = new promise(function (resolve, reject) {
            var User = {
                name: user.name,
                age: user.age,
                address: user.address,
                phone: user.phone,
            };
            _this._UserRepo.create(User, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        return p;
    };
    UserService.prototype.findUser = function (name) {
        var _this = this;
        var p = new promise(function (resolve, reject) {
            _this._UserRepo.find({ name: name }).sort({ createdAt: -1 }).limit(1).exec(function (err, res) {
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
    };
    return UserService;
}());
exports.UserService = UserService;
Object.seal(UserService);
//# sourceMappingURL=userService.js.map