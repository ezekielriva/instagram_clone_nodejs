import User from "../../entities/user";
import FollowUserUseCase from ".";
import { BuildUser } from "../../spec/factories/user_factory";
import { AlreadyFollowingError, CircularFollowError } from "./errors";
import { UserRepository } from "../../adapters/memory";

describe("Follower Use Cases", () : void => {
    describe("when it is not following", () : void => {
        test("it follows another users", () : void => {
            var user:User = BuildUser();
            var follower:User = BuildUser();
            var userRepository:UserRepository = new UserRepository();
            user = userRepository.Create(user);
            
            var useCase:FollowUserUseCase = new FollowUserUseCase(follower, userRepository);
            var userUT:User = useCase.execute(user.id);

            expect(userUT.followers.find((u) => {
                return u.id == follower.id;
            })).toBe(follower);
        });
    
        test("it cannot follow itself", () : void => {
            var user:User = BuildUser();
            var userRepository:UserRepository = new UserRepository();
            var useCase:FollowUserUseCase = new FollowUserUseCase(user, userRepository);

            user = userRepository.Create(user);

            expect(()=>{
                useCase.execute(user.id)
            }).toThrow(CircularFollowError);
        });
    });

    describe("when it is following", () :void => {
        test("it throw an error", () : void => {
            var user: User = BuildUser();
            var follower:User = BuildUser();
            var userRepository:UserRepository = new UserRepository();
        
            var useCase : FollowUserUseCase = new FollowUserUseCase(user, userRepository);

            follower = userRepository.Create(follower);

            useCase.execute(follower.id);
        
            expect(() => {
                useCase.execute(follower.id)
            }).toThrow(AlreadyFollowingError);
        });
    });
});