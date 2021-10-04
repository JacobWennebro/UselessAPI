import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
    res.send(`Hej ${req.query.name || " där!"}`);
}