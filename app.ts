import http = require("http");
import express = require("express");
import Routers = require("named-routes");
import mongoose = require("mongoose");
require("express-di");
import { UserRepository } from "./2.Repositories/userRepository";
import { HomeController } from "./4.controllers/homeController";
import { UserService, IUserService } from "./3.Services/userService";
import { Request, Response } from "express";
import { TestController } from "./4.Controllers/testController";

let app: any = express();
app.set("port", process.env.PORT || 3000);

if (process.pid) {
    console.log("This process is your pid " + process.pid);
}

// apply DI priciple
app.factory("homeController", (req: any, res: any, next: any) => {
    let repo: UserRepository = new UserRepository();
    let service: IUserService = new UserService(repo);
    next(null, new HomeController(service));
});
app.factory("testController", (req: any, res: any, next: any) => {
    let repo: UserRepository = new UserRepository();
    let service: IUserService = new UserService(repo);
    next(null, new TestController(service));
});

// register route
app.get("/", (homeController: HomeController, req: Request, res: Response) => {
    homeController.index(req, res);
});

app.get("/test", (testController: TestController, req: Request, res: Response) => {
    testController.index(req, res);
});

app.get("/test/index1", (testController: TestController, req: Request, res: Response) => {
    testController.index1(req, res);
});

// config named routes
let router: Routers = new Routers();
router.extendExpress(app);
router.registerAppHelpers(app);

http.createServer(app).listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});

// connect MongoDb
let uri: string = "mongodb://localhost/myDB";
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    } else {
        console.log("Connected to MongoDb");
    }
});
