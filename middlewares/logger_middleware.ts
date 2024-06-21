import Debug from "debug";
import { Request, Response, NextFunction } from "express";

const debug = Debug("requests");

export default function LoggerMiddleware(req:Request, res:Response, next:NextFunction) {
    debug("%s", { time: Date.now(), path: req.path, params: req.params, body: req.body, session: req.session });
    next();
};