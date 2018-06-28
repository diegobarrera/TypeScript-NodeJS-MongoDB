import http = require("http");
import express = require("express");
import exphbs = require("express-handlebars");
import Routers = require("named-routes");
import mongoose = require("mongoose");
require("express-di");
import * as core from "express-serve-static-core";
import { UserRepository } from "./2.Repositories/userRepository";
import { HomeController } from "./4.controllers/homeController";
import { TestController } from "./4.controllers/testController";
import { UserService, IUserService } from "./3.Services/userService";
import { Request, Response } from "express";

let app: core.Express = express();
app.set("port", process.env.PORT || 3000);

if (process.pid) {
    console.log("This process is your pid " + process.pid);
}

// apply DI priciple
let repo: UserRepository = new UserRepository();
let service: IUserService = new UserService(repo);
var home_controller: HomeController = new HomeController(service);
var test_controller: TestController = new TestController();
app.factory("home_controller", (req: any, res: any, next: any) => {
    next(null, home_controller);
});
app.factory("test_controller", (req: any, res: any, next: any) => {
    next(null, test_controller);
});

// register route
app.get("/", (home_controller: HomeController, req: Request, res: Response) => {
    home_controller.index(req, res);
});

app.get("/test", (test_controller: TestController, req: Request, res: Response) => {
    test_controller.index(req, res);
});

// config named routes
let router: Routers = new Routers();
router.extendExpress(app);
router.registerAppHelpers(app);

// let nodejs know all scripts in this folder are static, don't run them
app.use("/6.StaticScripts", express.static("6.StaticScripts"));

// active URL for helper
let activeRoute: string = "";
app.use((request, response, next) => {
    let route: any = router.match(request);
    if (route) {
        activeRoute = route.route.options.name;
    }
    next();
});

// config Handlebars
let blocks: any = {};
let Handlebars: Exphbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: __dirname + "/5.views/layouts/",
    partialsDir: __dirname + "/5.views/partials/",
    helpers: {
        url: (routeName: string, params: any) => {
            return app.locals.url(routeName, params);
        },
        activeRoute: (routeName: any) => {
            return routeName === activeRoute ? "active" : "";
        },
        activeRoutes: (routeNames: any) => {
            // tODO
            return routeNames.split(",").indexOf(activeRoute) >= 0 ? "active" : "";
        },
        block: (name: string) => {
            let val: any = (blocks[name] || []).join("\n");

            // clear the block
            blocks[name] = [];
            return val;
        },
        extend: (name: string, context: any) => {
            let block: any = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }

            block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
        }
    }
});

// view engine setup
app.engine("handlebars", Handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/5.views");

http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});

// connect MongoDb
let uri: string = "mongodb://localhost/riahk";
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    } else {
        console.log("Connected to MongoDb");
    }
});
