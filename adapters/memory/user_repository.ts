import User from "../../entities/user";
import EncryptDectyptPassword from "../../services/crypto/encrypt_decrypt_password";
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

    Patch(user:User):User {
        var index:number|undefined;
        
        this.users.find((storedUser, i) => {
            if (storedUser.id == user.id) {
                index = i;
                return true;
            } else {
                return false;
            }
        })

        if(index) {
            this.users[index] = user;
        }

        return user;
    }

    private incrementIndex() {
        this.index++;
    }
}
