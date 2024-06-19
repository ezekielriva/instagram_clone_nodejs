import User from "../../entities/user";
import EncryptDectyptPassword from "../../services/encrypt_decrypt_password";
import IUserRepository from "../../use_cases/repositories/user_repository";

export default class UserRepository implements IUserRepository {
    private static instance: UserRepository;

    private users: User[];
    private index: number;

    constructor() {
        this.users = [];
        this.index = 0;
    }

    public static getInstance():UserRepository {
        if(!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
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

    Authenticate(username:string, password:string): User | undefined {
        return this.users.find((user) => {
            return user.username == username && EncryptDectyptPassword.compare(password, user.password);
        });
    }

    private incrementIndex() {
        this.index++;
    }
}
