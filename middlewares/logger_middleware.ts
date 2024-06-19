import { Request, Response, NextFunction } from "express";

export default function LoggerMiddleware(req:Request, res:Response, next:NextFunction) {
    console.log({ time: Date.now(), path: req.path, params: req.params, body: req.body });
    next();
};