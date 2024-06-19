import User from "../../entities/user";
import UserRepository from "../../use_cases/repositories/user_repository";

export default class UserRepositoryMemory implements UserRepository {
    users: User[];
    index: number;

    constructor() {
        this.users = [];
        this.index = 0;
    }

    Create(user: User): User {
        user.id = this.index;
        this.users.push(user);
        this.incrementIndex();
        
        return user;
    }

    List(): User[] {
        return this.users;
    }

    private incrementIndex() {
        this.index++;
    }
}
