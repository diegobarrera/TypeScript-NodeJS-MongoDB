import userService = require('../3.Services/userService');
import userModel = require('../1.Models/user');
import express = require("express");

export class TestController {
    constructor() {
    }

    index(expressReq: express.Request, expressRes: express.Response) {
        expressRes.json({ message: 'hooray! welcome to our api!' });  
    };
}