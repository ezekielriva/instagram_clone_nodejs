import User from "../entities/user";
import UserRepository from "./repositories/user_repository";

export default class CreateUserUseCase {
    userRepository:UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    execute(name:string, email:string, password:string, username: string) {
        var user = new User(name, email, password, username);
        return this.userRepository.Create(user);
    }
}