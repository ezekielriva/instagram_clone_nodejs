import { Request, Response, NextFunction } from "express";

import logger from "../services/logger";

export default function LoggerMiddleware(req:Request, res:Response, next:NextFunction) {
    logger.info("", { path: req.path, params: req.params, body: req.body, session: req.session })
    res.locals.logger = logger;
    next();
};