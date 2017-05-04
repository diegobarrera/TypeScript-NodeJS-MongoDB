"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var express = require("express");
var exphbs = require("express-handlebars");
var namedRouters = require("named-routes");
var mongoose = require("mongoose");
var userRepository = require("./2.Repositories/userRepository");
var userService = require("./3.Services/userService");
var homeController = require("./4.Controllers/homeController");
var testController = require("./4.Controllers/testController");
require('express-di');
var app = express();
app.set('port', process.env.PORT || 3000);
var repo = new userRepository.UserRepository();
var service = new userService.UserService(repo);
var home_controller = new homeController.HomeController(service);
var test_controller = new testController.TestController();
app.factory('home_controller', function (req, res, next) {
    next(null, home_controller);
});
app.factory('test_controller', function (req, res, next) {
    next(null, test_controller);
});
app.get('/', function (home_controller, req, res) {
    home_controller.index(req, res);
});
app.get('/test', function (test_controller, req, res) {
    test_controller.index(req, res);
});
var router = new namedRouters();
router.extendExpress(app);
router.registerAppHelpers(app);
app.use("/6.StaticScripts", express.static('6.StaticScripts'));
var activeRoute = '';
app.use(function (request, response, next) {
    var route = router.match(request);
    if (route) {
        activeRoute = route.route.options.name;
    }
    next();
});
var blocks = {};
var Handlebars = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/5.Views/layouts/',
    partialsDir: __dirname + '/5.Views/partials/',
    helpers: {
        url: function (routeName, params) {
            return app.locals.url(routeName, params);
        },
        activeRoute: function (routeName) {
            return routeName === activeRoute ? 'active' : '';
        },
        activeRoutes: function (routeNames) {
            return routeNames.split(',').indexOf(activeRoute) >= 0 ? 'active' : '';
        },
        block: function (name) {
            var val = (blocks[name] || []).join('\n');
            blocks[name] = [];
            return val;
        },
        extend: function (name, context) {
            var block = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }
            block.push(context.fn(this));
        }
    }
});
app.engine('handlebars', Handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/5.Views');
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
var uri = 'mongodb://localhost/riahk';
mongoose.Promise = global.Promise;
mongoose.connect(uri, function (err) {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});
//# sourceMappingURL=app.js.map