import { IUserService } from "../3.Services/userService";
import { Request, Response } from "express";
import { IUserModel } from "../1.Models/user";

export class HomeController {
    private _UserService: IUserService;
    constructor(UserService: IUserService) {
        this._UserService = UserService;
    }

    index(expressReq: Request, expressRes: Response): void {
        var user: IUserModel = <IUserModel>{ name: "Steve", age: 30, address: "address" };

        this._UserService.createUser(user).then((res) => {
            this._UserService.findUser("Steve").then((res) => {
                // now update the Hero
                let hero: IUserModel = <IUserModel>res;
                hero.age = 20;
                hero.save((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        expressRes.render("home/index", { name: hero.name, age: hero.age });
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