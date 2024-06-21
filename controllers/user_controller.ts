import { Request, Response } from "express";

import UserRepository from "../adapters/memory/user_repository";
import User from "../entities/user";
import CreateUserUseCase from "../use_cases/create_user_use_case";

export default class UserController {
    public static Post(req: Request, res: Response) {
        var repository: UserRepository = UserRepository.getInstance();
        var useCase : CreateUserUseCase = new CreateUserUseCase(repository);
        var user : User = useCase.execute(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.username
        );

        res.send({ 
            name: user.name,  
            username: user.username,
            email: user.email
        });
    }
}