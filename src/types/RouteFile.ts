import { Request, Response } from 'express'

export default class RouteFile {

    method = "GET";

    handler(req: Request, res: Response) {
        res.send("OK");
    }

}