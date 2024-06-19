import User from "../../entities/user";

export default interface UserRepository {
    Create(user: User) : User;
    List(): User[];
}