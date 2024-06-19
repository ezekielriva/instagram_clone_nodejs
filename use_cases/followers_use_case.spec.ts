import NullUser from "../entities/null_user";
import User from "../entities/user";
import FollowerUseCase from "./follower_use_case";

describe("Follower Use Cases", () : void => {
    describe("when it is not following", () : void => {
        test("it follows another users", () : void => {
            var user: User = new User("name", "email", "pass", "username");
            var follower: NullUser = new NullUser()
            
            var useCase : FollowerUseCase = new FollowerUseCase(user);
    
            expect(useCase.FollowUser(follower)).toBe(true);
            expect(user.followers.length).toBe(1);
        });
    
        test("it cannot follow itself", () : void => {
            var user: NullUser = new NullUser();
            var useCase : FollowerUseCase = new FollowerUseCase(user);
    
            expect(useCase.FollowUser(user)).toBe(false);
            expect(user.followers.length).toBe(0);
        });
    });

    describe("when it is following", () :void => {
        test("it does nothing", () : void => {
            var user: User = new User("name", "email", "pass", "username");
            var follower: NullUser = new NullUser();
        
            var useCase : FollowerUseCase = new FollowerUseCase(user);

            useCase.FollowUser(follower);
        
            expect(useCase.FollowUser(follower)).toBe(false);
            expect(user.followers.length).toBe(1);
        });
    });
});