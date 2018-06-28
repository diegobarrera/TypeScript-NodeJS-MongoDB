"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const exphbs = require("express-handlebars");
const Routers = require("named-routes");
const mongoose = require("mongoose");
require("express-di");
const userRepository_1 = require("./2.Repositories/userRepository");
const homeController_1 = require("./4.controllers/homeController");
const testController_1 = require("./4.controllers/testController");
const userService_1 = require("./3.Services/userService");
let app = express();
app.set("port", process.env.PORT || 3000);
let repo = new userRepository_1.UserRepository();
let service = new userService_1.UserService(repo);
var home_controller = new homeController_1.HomeController(service);
var test_controller = new testController_1.TestController();
app.factory("home_controller", (req, res, next) => {
    next(null, home_controller);
});
app.factory("test_controller", (req, res, next) => {
    next(null, test_controller);
});
app.get("/", (home_controller, req, res) => {
    home_controller.index(req, res);
});
app.get("/test", (test_controller, req, res) => {
    test_controller.index(req, res);
});
let router = new Routers();
router.extendExpress(app);
router.registerAppHelpers(app);
app.use("/6.StaticScripts", express.static("6.StaticScripts"));
let activeRoute = "";
app.use((request, response, next) => {
    let route = router.match(request);
    if (route) {
        activeRoute = route.route.options.name;
    }
    next();
});
let blocks = {};
let Handlebars = exphbs.create({
    defaultLayout: "main",
    layoutsDir: __dirname + "/5.views/layouts/",
    partialsDir: __dirname + "/5.views/partials/",
    helpers: {
        url: (routeName, params) => {
            return app.locals.url(routeName, params);
        },
        activeRoute: (routeName) => {
            return routeName === activeRoute ? "active" : "";
        },
        activeRoutes: (routeNames) => {
            return routeNames.split(",").indexOf(activeRoute) >= 0 ? "active" : "";
        },
        block: (name) => {
            let val = (blocks[name] || []).join("\n");
            blocks[name] = [];
            return val;
        },
        extend: (name, context) => {
            let block = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }
            block.push(context.fn(this));
        }
    }
});
app.engine("handlebars", Handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/5.views");
http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
let uri = "mongodb://localhost/riahk";
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log("Connected to MongoDb");
    }
});
//# sourceMappingURL=app.js.map