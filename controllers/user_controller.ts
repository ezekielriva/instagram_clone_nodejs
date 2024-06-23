import { Request, RequestHandler, Response } from "express";

import UserRepository from "../adapters/memory/user_repository";
import User from "../entities/user";
import CreateUserUseCase from "../use_cases/create_user_use_case";

const Create:RequestHandler = function (req: Request, res: Response) {
    var repository: UserRepository = UserRepository.getInstance();
    var useCase : CreateUserUseCase = new CreateUserUseCase(repository);
    var user : User = useCase.execute(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.username
    );
    
    res.send({ 
        id: user.id,
        name: user.name,  
        username: user.username,
        email: user.email
    });
}

export default {
    Create: Create
}