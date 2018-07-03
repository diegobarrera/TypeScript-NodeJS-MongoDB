require("express-di");
import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "../services/iuser.service";
import { HomeController } from "../controllers/home.controller";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { IUserModel } from "../models/iuser.model";
import express = require("express");

export class RouteRegister {
    _app: any;
    constructor(app: any) {
        this._app = app;
    }
    register(): void {
        // apply DI priciple
        this._app.factory("homeController", (req: any, res: any, next: any) => {
            next(null, new HomeController());
        });
        this._app.factory("userController", (req: any, res: any, next: any) => {
            let repo: UserRepository = new UserRepository();
            let service: IUserService = new UserService(repo);
            next(null, new UserController(service));
        });

        this._app.get("/", (homeController: HomeController, req: Request, res: Response) => {
            homeController.index(req, res);
        });

        this._app.post("/login", (req: Request, res: Response) => {
            if (req.body.name && req.body.password) {
                let name: string = req.body.name;

                let repo: UserRepository = new UserRepository();
                let service: IUserService = new UserService(repo);

                // usually this would be a database call:
                service.findUser(name).subscribe((user: IUserModel) => {
                    if (!user) {
                        res.status(401).json({ message: "no such user found" });
                    }

                    if (user.password === req.body.password) {
                        let payload: any = { id: user.id };
                        let jwt: any = require("jsonwebtoken");
                        let passportJWT: any = require("passport-jwt");
                        let ExtractJwt: any = passportJWT.ExtractJwt;
                        let jwtOptions: any = {};
                        jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
                        jwtOptions.secretOrKey = "secretOrKey";

                        var token: any = jwt.sign(payload, jwtOptions.secretOrKey);
                        res.json({ message: "ok", token: token });
                    } else {
                        res.status(401).json({ message: "passwords did not match" });
                    }
                });
            } else {
                res.json({ message: "false" });
            }
        });

        let apiRoutes: any = express.Router();
        apiRoutes.use((req: any, res: any, next: any) => {
            // check header or url parameters or post parameters for token
            let token: string = req.body.token || req.query.token || req.headers["x-access-token"];

            // decode token
            if (token) {
                // verifies secret and checks exp
                let jwt: any = require("jsonwebtoken");
                jwt.verify(token, "secretOrKey", (err: any, decoded: any) => {
                    if (err) {
                        return res.json({ success: false, message: "Failed to authenticate token." });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: "No token provided."
                });
            }
        });

        // register route
        apiRoutes.get("/user/get", (userController: UserController, req: Request, res: Response) => {
            userController.get(req, res);
        });

        apiRoutes.put("/user/create", (userController: UserController, req: Request, res: Response) => {
            userController.create(req, res);
        });

        apiRoutes.post("/user/update", (userController: UserController, req: Request, res: Response) => {
            userController.update(req, res);
        });

        this._app.use("/api", apiRoutes);
    }
}