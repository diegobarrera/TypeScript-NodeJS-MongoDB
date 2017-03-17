import userService = require('../3.Services/userService');
import userModel = require('../1.Models/user');
import express = require("express");

export class HomeController {
    private _UserService: userService.IUserService;
    constructor(UserService: userService.IUserService) {
        this._UserService = UserService;
    }

    index(expressReq: express.Request, expressRes: express.Response) {
        var user = <userModel.IUserModel>{ name: 'Steve', age: 30, address: 'address' };

        this._UserService.createUser(user).then((res) => {
            this._UserService.findUser('Steve').then((res) => {
                // now update the Hero
                let hero = <userModel.IUserModel>res;
                hero.age = 20;
                hero.save((err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        expressRes.render('home/index', { name: hero.name, age: hero.age });
                    }
                });
            }, (err) => {
                if (err) {
                    console.log(err.message);
                }
            });

        }, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
        });
    };
}