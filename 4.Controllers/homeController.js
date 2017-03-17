"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HomeController = (function () {
    function HomeController(UserService) {
        this._UserService = UserService;
    }
    HomeController.prototype.index = function (expressReq, expressRes) {
        var _this = this;
        var user = { name: 'Steve', age: 30, address: 'address' };
        this._UserService.createUser(user).then(function (res) {
            _this._UserService.findUser('Steve').then(function (res) {
                var hero = res;
                hero.age = 20;
                hero.save(function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        expressRes.render('home/index', { name: hero.name, age: hero.age });
                    }
                });
            }, function (err) {
                if (err) {
                    console.log(err.message);
                }
            });
        }, function (err) {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
        });
    };
    ;
    return HomeController;
}());
exports.HomeController = HomeController;
//# sourceMappingURL=homeController.js.map