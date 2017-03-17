"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestController = (function () {
    function TestController() {
    }
    TestController.prototype.index = function (expressReq, expressRes) {
        expressRes.json({ message: 'hooray! welcome to our api!' });
    };
    ;
    return TestController;
}());
exports.TestController = TestController;
//# sourceMappingURL=testController.js.map