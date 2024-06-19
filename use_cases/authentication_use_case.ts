import NullUser from "../entities/null_user";
import User from "../entities/user";
import UserRepository from "./repositories/user_repository";

export default class AuthenticationUseCase {
    readonly userRepository:UserRepository;

    constructor(userRepository:UserRepository) {
        this.userRepository = userRepository;
    }

    execute(username:string,password:string):User | undefined {
        return this.userRepository.Authenticate(username,password);
    }
}