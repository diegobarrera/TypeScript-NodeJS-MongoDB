import { IUserService } from "../3.Services/userService";
import { IUserModel } from "../1.Models/user";
import { Request, Response } from "express";

export class TestController {
    private _userService: IUserService;
    constructor(userService: IUserService) {
        this._userService = userService;
    }

    index(expressReq: Request, expressRes: Response): void {
        this._userService.findUser("Steve").then((hero: IUserModel) => {
            expressRes.json({ name: hero.name, age: hero.age });
        }, (err: any) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    index1(expressReq: Request, expressRes: Response): void {
        this._userService.findUser("Steve").then((hero: IUserModel) => {
            expressRes.json({ name: hero.name, age: hero.age });
        }, (err: any) => {
            if (err) {
                console.log(err.message);
            }
        });
    }
}