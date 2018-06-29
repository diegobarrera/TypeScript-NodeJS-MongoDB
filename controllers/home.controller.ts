import { Request, Response } from "express";

export class HomeController {

    index(request: Request, response: Response): void {
        response.json({ name: "This is index page!" });
    }
}