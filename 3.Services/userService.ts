import promise = require("promise");
import userModel = require('../1.Models/user');
import repository = require('../2.Repositories/userRepository');

// a interface of user service
export interface IUserService {
    createUser(user: userModel.IUserModel): promise.IThenable<userModel.IUserModel>;
    findUser(name: string): promise.IThenable<userModel.IUserModel>;
}

// a class of user serivce
export class UserService implements IUserService {
    private _UserRepo: repository.UserRepository;

    constructor(UserRepo: repository.UserRepository) {
        this._UserRepo = UserRepo;
    }

    // create a user from model
    createUser(user: userModel.IUserModel): promise.IThenable<userModel.IUserModel> {
        let p = new promise((resolve, reject) => {

            let User = <userModel.IUserModel>{
                name: user.name,
                age: user.age,
                address: user.address,
                phone: user.phone,
            };

            // call repository to create user
            this._UserRepo.create(User, (err, res) => {
                if (err) {
                    // error callback
                    reject(err);
                }
                else {
                    // success callback
                    resolve(res);
                }
            });
        });

        return p;
    }

    // find a user by name
    findUser(name: string): promise.IThenable<userModel.IUserModel> {
        let p = new promise((resolve, reject) => {

            // call repository to find user
            this._UserRepo.find({ name: name }).sort({ createdAt: -1 }).limit(1).exec((err, res) => {
                if (err) {
                    // error callback
                    reject(err);
                }
                else {
                    // success callback
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

// force the service that can not be inherited
Object.seal(UserService);