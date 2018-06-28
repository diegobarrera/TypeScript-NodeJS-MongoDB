"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    constructor(UserService) {
        this._UserService = UserService;
    }
    index(expressReq, expressRes) {
        var user = { name: "Steve", age: 30, address: "address" };
        this._UserService.createUser(user).then((res) => {
            this._UserService.findUser("Steve").then((res) => {
                let hero = res;
                hero.age = 20;
                hero.save((err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        expressRes.render("home/index", { name: hero.name, age: hero.age });
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
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=homeController.js.map