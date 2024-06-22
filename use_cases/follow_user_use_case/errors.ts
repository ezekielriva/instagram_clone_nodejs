import { TUserID } from "../../entities/user";

export class FollowUserUseCaseError extends Error {};
export class CircularFollowError extends FollowUserUseCaseError {
    constructor(userId:TUserID) {
        super(`User ${userId} cannot follow itself`)
    }
};
export class AlreadyFollowingError extends FollowUserUseCaseError {
    constructor(userId:TUserID, followerId:TUserID) {
        super(`User ${followerId} is already following User ${userId}`);
    }
};
export class UserNotFound extends FollowUserUseCaseError {};