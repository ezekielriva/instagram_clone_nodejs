import User from "../../entities/user";
import UserRepository from "../repositories/user_repository";
import { UnauthorizedError } from "./errors";
import { randomBytes } from "crypto";

export default class AuthenticationUseCase {
    readonly userRepository:UserRepository;
    readonly expiration:number = 60 * 1000;

    constructor(userRepository:UserRepository) {
        this.userRepository = userRepository;
    }

    execute(username:string,password:string):User {
        var user:User | undefined = this.userRepository.Authenticate(username,password);

        if (!user) {
            throw new UnauthorizedError();
        }

        this.setUserAuthToken(user);
        this.userRepository.Patch(user);

        return user;
    }

    private setUserAuthToken(user:User):void {
        user.auth_token = randomBytes(20).toString("hex");
        user.auth_token_exp = Date.now() + this.expiration;
    }
}