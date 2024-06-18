import User from "../entities/user";

export default class UserUseCase {
    CreateUser(name:string, email:string, password:string, username: string) {
        return new User(name, email, password, username);
    }
}