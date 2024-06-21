import User from "../../entities/user";
import UserRepository from "../repositories/user_repository";
import { NotFoundError } from "../repositories/errors";
import { ExpTokenNotDefined, TokenExpired, UserNotFound } from "./errors";

export default class RetrieveCurrentUserUseCase {

    userRepository:UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * execute
     */
    public execute(token:string):User {
        var user:User = this.findUser(token);

        this.isTokenExpired(user);

        return user;
    }

    private findUser(token:string):User {
        try {
            return this.userRepository.FindUserByAuthToken(token);
        } catch(NotFoundError) {
            throw new UserNotFound();
        }
    }

    private isTokenExpired(user:User):void {
        if ( !user.auth_token_exp ) throw new ExpTokenNotDefined();
        if ( user.auth_token_exp < Date.now() ) throw new TokenExpired();
    }
}