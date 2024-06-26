import User, { TUserID } from "../../entities/user";

export default interface UserRepository {
    Create(user: User): User;
    List(): User[];
    Authenticate(username:string, password:string):User | undefined;
    FindUserByAuthToken(token:string):User;
    Patch(user:User):User;
    Find(id:TUserID):User;
}