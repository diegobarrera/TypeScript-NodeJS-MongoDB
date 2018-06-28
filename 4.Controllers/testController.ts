import express = require("express");

export class TestController {
    index(expressReq: express.Request, expressRes: express.Response): void {
        expressRes.json({ message: "hooray! welcome to our api!" });
    }
}