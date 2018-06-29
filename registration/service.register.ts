require("express-di");
import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "../services/iuser.service";
import { HomeController } from "../controllers/home.controller";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

export class ServiceRegister {
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

        // register route
        this._app.get("/", (homeController: HomeController, req: Request, res: Response) => {
            homeController.index(req, res);
        });

        this._app.get("/user/get", (userController: UserController, req: Request, res: Response) => {
            userController.get(req, res);
        });

        this._app.put("/user/create", (userController: UserController, req: Request, res: Response) => {
            userController.create(req, res);
        });

        this._app.post("/user/update", (userController: UserController, req: Request, res: Response) => {
            userController.update(req, res);
        });
    }
}