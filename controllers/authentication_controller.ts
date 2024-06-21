import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../adapters/memory";
import AuthenticationUseCase from "../use_cases/authentication_use_case";
import User from "../entities/user";
import RetrieveCurrentUserUseCase from "../use_cases/retrieve_current_user_use_case";

export default class AuthenticationController {

    public static SignIn(req:Request, res:Response) {
        const repository:UserRepository = UserRepository.getInstance();
        const useCase:AuthenticationUseCase = new AuthenticationUseCase(repository);
    
        try {
            var user:User = useCase.execute(req.body.username, req.body.password);

            req.session.regenerate((err) => {
                if (err) throw new Error("Unable to regenerate a session");

                req.session.auth_token = user.auth_token;

                req.session.save((err) => {
                    if (err) throw new Error("Unable to save the session");
                    
                    res.status(200).send(user);
                })
            });
        } catch (Error) {
            res.status(401).send({});
        }
    }

    public static isAuthenticated(req: Request, res:Response, next:NextFunction):void {
        const repository:UserRepository = UserRepository.getInstance();
        var useCase:RetrieveCurrentUserUseCase = new RetrieveCurrentUserUseCase(repository);

        if ( req.session.auth_token ) {
            req.session.currentUser = useCase.execute(req.session.auth_token);
            next();
        } else {
            res.status(401).send({});
        }
    }

};