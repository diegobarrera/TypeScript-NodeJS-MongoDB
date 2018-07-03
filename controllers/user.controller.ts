import { Request, Response } from "express";
import { IUserModel } from "../models/iuser.model";
import { IUserService } from "../services/iuser.service";

export class UserController {
    private _userService: IUserService;
    constructor(userService: IUserService) {
        this._userService = userService;
    }

    create(request: Request, response: Response): void {
        var user: IUserModel = <IUserModel>{
            name: request.body.name,
            age: request.body.age,
            address: request.body.address,
            password: request.body.password
        };
        this._userService.createUser(user).subscribe(result => {
            response.json({ sussess: true });
        });
    }

    update(request: Request, response: Response): void {
        this._userService.findUser(request.body.name).subscribe((hero: IUserModel) => {
            // now update the Hero
            hero.age = request.body.age;
            hero.address = request.body.address;
            hero.password = request.body.password;
            hero.save((err, res) => {
                if (err) {
                    response.json({ error: err });
                    console.log(err);
                } else {
                    response.json({ sussess: true });
                }
            });
        }, (err: any) => {
            if (err) {
                response.json({ error: err });
                console.log(err.message);
            }
        });
    }

    get(request: Request, response: Response): void {
        this._userService.findUser(request.query.name).subscribe((hero: IUserModel) => {
            if (hero) {
                response.json(hero);
            } else {
                response.json({ result: "User is not found." });
            }
        }, (err: any) => {
            if (err) {
                response.json({ error: err });
                console.log(err.message);
            }
        });
    }
}