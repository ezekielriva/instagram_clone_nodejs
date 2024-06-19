import User from "../../entities/user";
import UserRepository from "../../use_cases/repositories/user_repository";

export default class UserRepositoryMemory implements UserRepository {
    users: User[];

    constructor() {
        this.users = [];
    }

    Create(user: User): User {
        this.users.push(user);
        return user;
    }

    List(): User[] {
        return this.users;
    }
}