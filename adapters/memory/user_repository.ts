import User, { TUserID } from "../../entities/user";
import EncryptDectyptPassword from "../../services/crypto/encrypt_decrypt_password";
import { NotFoundError } from "../../use_cases/repositories/errors";
import IUserRepository from "../../use_cases/repositories/user_repository";

export default class UserRepository implements IUserRepository {
    private static instance: UserRepository;

    private users: User[];

    constructor() {
        this.users = [];
    }

    public static getInstance():UserRepository {
        if(!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

    Create(user: User): User {
        user.id = crypto.randomUUID();
        this.users.push(user);
        
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

    Find(id: TUserID): User {
        var user:User | undefined = this.users.find( (user) => {
            return user.id == id;
        });
        
        if (!user) throw new NotFoundError();

        return user;
    }

    FindUserByAuthToken(token: string): User {
        var user:User | undefined = this.users.find((user) => {
            return user.auth_token == token;
        });

        if (user) return user;

        throw new NotFoundError();
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
}
