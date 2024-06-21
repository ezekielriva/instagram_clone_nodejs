import RetrieveCurrentUserUseCase from ".";
import { UserRepository } from "../../adapters/memory";
import User from "../../entities/user";
import { TokenExpired, UserNotFound } from "./errors";

describe("RetrieveCurrentUser", ():void => {
    describe("when currentUser exists", ():void => {
        describe("when session didn't expire", () => {
            test("it returns user", ():void => {
                var repository:UserRepository = new UserRepository();
                var user:User = new User("name","mail","pass","username");
    
                user.auth_token = "token";
                user.auth_token_exp = Date.now() + 2000;
    
                repository.Create(user);
    
                var useCase:RetrieveCurrentUserUseCase = new RetrieveCurrentUserUseCase(repository);
    
                var user:User = useCase.execute("token");
    
                expect(user.username).toBe("username");
            });
        });

        describe("when session expire", () => {
            test("it returns an error", ():void => {
                var repository:UserRepository = new UserRepository();
                var user:User = new User("name","mail","pass","username");
    
                user.auth_token = "token";
                user.auth_token_exp = Date.now() - 1000;
    
                repository.Create(user);
    
                var useCase:RetrieveCurrentUserUseCase = new RetrieveCurrentUserUseCase(repository);
    
                expect(() => {
                    useCase.execute("token");
                }).toThrow(TokenExpired);            
            });
        });
    });

    describe("when currentUser doesnt exists", ():void => {
        test("it returns an error", ():void => {
            var repository:UserRepository = new UserRepository();
            var useCase:RetrieveCurrentUserUseCase = new RetrieveCurrentUserUseCase(repository);

            expect(() => {
                useCase.execute("token");
            }).toThrow(UserNotFound);            
        });
    });
});