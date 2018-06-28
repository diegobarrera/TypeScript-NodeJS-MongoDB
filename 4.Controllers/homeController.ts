import { IUserService } from "../3.Services/userService";
import { Request, Response } from "express";
import { IUserModel } from "../1.Models/user";

export class HomeController {
    private _userService: IUserService;
    constructor(userService: IUserService) {
        this._userService = userService;
    }

    index(expressReq: Request, expressRes: Response): void {
        var user: IUserModel = <IUserModel>{ name: "Steve", age: 30, address: "address" };

        this._userService.createUser(user).then((res) => {
            this._userService.findUser("Steve").then((hero: IUserModel) => {
                // now update the Hero
                hero.age = 20;
                hero.save((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        expressRes.json({ name: hero.name, age: hero.age });
                    }
                });
            }, (err: any) => {
                if (err) {
                    console.log(err.message);
                }
            });
        }, (err: any) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
        });
    }
}