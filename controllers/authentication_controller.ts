import { Request, Response } from "express";
import { UserRepository } from "../adapters/memory";
import AuthenticationUseCase from "../use_cases/authentication_use_case";
import User from "../entities/user";

export default class AuthenticationController {
    
    public sign_in(req:Request, res:Response):void {
        const repository:UserRepository = UserRepository.getInstance();
        const useCase:AuthenticationUseCase = new AuthenticationUseCase(repository);
    
        try {
            var user:User = useCase.execute(req.body.username, req.body.password);
            req.session.auth_token = user.auth_token;
            res.status(200).send(user);
        } catch (error) {
            res.status(401).send({});
        }
    }

};