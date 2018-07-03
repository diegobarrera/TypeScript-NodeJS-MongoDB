import http = require("http");
import express = require("express");
import Routers = require("named-routes");
import mongoose = require("mongoose");
import { RouteRegister } from "./registration/route.register";

let app: any = express();
app.set("port", process.env.PORT || 3000);

let bodyParser: any = require("body-parser");
app.use(bodyParser.json());

app.use((req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if (process.pid) {
    console.log("This process is your pid " + process.pid);
}

let service: RouteRegister = new RouteRegister(app);
service.register();

// config named routes
let router: Routers = new Routers();
router.extendExpress(app);
router.registerAppHelpers(app);

http.createServer(app).listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});

// connect MongoDb
let uri: string = "mongodb://localhost:27017/myDB";
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    } else {
        console.log("Connected to MongoDb");
    }
});
