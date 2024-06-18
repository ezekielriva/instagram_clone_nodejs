import User from "../entities/user";

export default class FollowerUseCase {
    user:User;

    constructor(user:User) {
        this.user = user;
    }

    FollowUser(follower:User) : boolean {
        if ( this.isValidFollowUserUseCase(follower) ) {
            return this.user.followers.push(follower) > 0;
        } else {
            return false;
        }
    }

    private isValidFollowUserUseCase(follower : User) : boolean {
        return !this.isFollowingItself(follower) && !this.isFollowing(follower);
    }

    private isFollowingItself(follower : User) : boolean {
        return this.user == follower;
    }

    private isFollowing(follower : User) : boolean {
        return this.user.followers.indexOf(follower) != -1;
    }
};