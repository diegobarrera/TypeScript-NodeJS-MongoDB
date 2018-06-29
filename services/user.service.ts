import promise = require("promise");
import { IUserModel } from "../models/iuser.model";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "./iuser.service";

// a class of user serivce
export class UserService implements IUserService {
    private _userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this._userRepo = userRepo;
    }

    // create a user from model
    createUser(user: IUserModel): Promise<boolean> {
        let p: Promise<boolean> = new promise((resolve, reject) => {
            let User: IUserModel = <IUserModel>{
                name: user.name,
                age: user.age,
                address: user.address,
                phone: user.phone,
                password: user.password,
            };

            // call repository to create user
            this._userRepo.create(User, (err, res) => {
                if (err) {
                    // error callback
                    console.log(err);
                } else {
                    // success callback
                    resolve(true);
                }
            });
        });
        return p;
    }

    // find a user by name
    findUser(name: string): Promise<IUserModel> {
        let p: Promise<IUserModel> = new promise((resolve, reject) => {

            // call repository to find user
            this._userRepo.find({ name: name }).sort({ createdAt: -1 }).limit(1).exec((err, res) => {
                if (err) {
                    // error callback
                    reject(err);
                } else {
                    // success callback
                    if (res.length) {
                        resolve(res[0]);
                    } else {
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