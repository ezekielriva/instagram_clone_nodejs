import { Request, RequestHandler, Response } from "express";
import User, { TUserID } from "../entities/user";
import FollowUserUseCase from "../use_cases/follow_user_use_case";
import { UserRepository } from "../adapters/memory";

const Create:RequestHandler = function(req: Request, res: Response) {
    var userRepository:UserRepository = UserRepository.getInstance();
    var useCase:FollowUserUseCase = new FollowUserUseCase(req.session.currentUser!, userRepository);

    try {
        var user:User = useCase.execute(req.params.userId as TUserID);
        res.status(200).send(user);
    } catch (error) {
        res.status(422).send({ error: (error as Error).message });
    }

}

export default {
    Create
}