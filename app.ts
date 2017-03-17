import http = require('http');
import express = require("express");
import exphbs = require('express-handlebars');
import path = require('path');
import namedRouters = require('named-routes');
import mongoose = require("mongoose");
import userRepository = require('./2.Repositories/userRepository');
import userService = require('./3.Services/userService');
import homeController = require('./4.controllers/homeController');
import testController = require('./4.controllers/testController');
require('express-di');

let app = express();
app.set('port', process.env.PORT || 3000);

// apply DI priciple
let repo = new userRepository.UserRepository();
let service: userService.IUserService = new userService.UserService(repo);
var home_controller = new homeController.HomeController(service);
var test_controller = new testController.TestController();
app.factory('home_controller', function (req, res, next) {
    next(null, home_controller);
});
app.factory('test_controller', function (req, res, next) {
    next(null, test_controller);
});

// register route
app.get('/', function (home_controller: homeController.HomeController, req: express.Request, res: express.Response) {
    home_controller.index(req, res);
});

app.get('/test', function (test_controller: testController.TestController, req: express.Request, res: express.Response) {
    test_controller.index(req, res);
});

// Config named routes
let router = new namedRouters();
router.extendExpress(app);
router.registerAppHelpers(app);

// let nodejs know all scripts in this folder are static, don't run them
app.use("/6.StaticScripts", express.static('6.StaticScripts'));

// Active URL for helper
let activeRoute = '';
app.use(function (request, response, next) {
    let route = router.match(request)
    if (route) {
        activeRoute = route.route.options.name
    }
    next();
});

// Config Handlebars
let blocks = {};
let Handlebars = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/5.views/layouts/',
    partialsDir: __dirname + '/5.views/partials/',
    helpers: {
        url: function (routeName, params) {
            return app.locals.url(routeName, params);
        },
        activeRoute: function (routeName) {
            return routeName === activeRoute ? 'active' : '';
        },
        activeRoutes: function (routeNames) {
            // TODO
            return routeNames.split(',').indexOf(activeRoute) >= 0 ? 'active' : '';
        },
        block: function (name) {
            let val = (blocks[name] || []).join('\n');

            // clear the block
            blocks[name] = [];
            return val;
        },
        extend: function (name, context) {
            let block = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }

            block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
        }
    }
});

// View engine setup
app.engine('handlebars', Handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/5.views');

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// connect MongoDb
let uri = 'mongodb://localhost/riahk';
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});