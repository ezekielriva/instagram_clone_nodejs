import User from "../entities/user";
import UserRepository from "./repositories/user_repository";

export default class UserUseCase {
    userRepository:UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    CreateUser(name:string, email:string, password:string, username: string) {
        var user:User = new User(name, email, password, username);
        return this.userRepository.Create(user);
    }
}