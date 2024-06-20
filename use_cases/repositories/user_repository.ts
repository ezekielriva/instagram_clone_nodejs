import User from "../../entities/user";

export default interface UserRepository {
    Create(user: User): User;
    List(): User[];
    Authenticate(username:string, password:string):User | undefined;
    Patch(user:User):User;
}