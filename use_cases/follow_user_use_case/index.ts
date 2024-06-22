import User, { TUserID } from "../../entities/user";
import UserRepository from "../repositories/user_repository";
import { AlreadyFollowingError, CircularFollowError, UserNotFound } from "./errors";
import { NotFoundError } from "../repositories/errors";

export default class FollowUserUseCase {
    private follower:User;
    private userRepository:UserRepository;

    constructor(follower:User, userRepository:UserRepository) {
        this.follower = follower;
        this.userRepository = userRepository;
    }

    public execute(userId:TUserID):User {
        var user:User;
        
        try {
            user = this.userRepository.Find(userId);
        } catch ( NotFoundError ) {
            throw new UserNotFound();
        }
    
        if ( this.isFollowingItself(user) ) throw new CircularFollowError(userId);
        if ( this.isFollowing(user) ) throw new AlreadyFollowingError(userId,this.follower.id);

        user.followers.push(this.follower);

        return user;
    }

    private isFollowingItself(user: User) : boolean {
        return this.follower == user;
    }

    private isFollowing(user:User) : boolean {
        return user.followers.indexOf(this.follower) != -1;
    }
};