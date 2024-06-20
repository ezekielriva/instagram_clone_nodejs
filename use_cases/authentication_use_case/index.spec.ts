import UserRepositoryMemory from "../../adapters/memory/user_repository";
import User from "../../entities/user";
import AuthenticationUseCase from ".";
import UserRepository from "../repositories/user_repository";
import { UnauthorizedError } from "./errors";

describe("AuthenticationUseCase", ():void => {
    describe("when user exist", ():void => {
        test("when username and password matches", ():void => {
            var userRepository:UserRepository = new UserRepositoryMemory();
            var useCase:AuthenticationUseCase = new AuthenticationUseCase(userRepository);

            userRepository.Create(
                new User("name","mail","password","username")
            );

            var user:User = useCase.execute("username", "password");

            expect(user).toBeInstanceOf(User);
            expect(user.auth_token).toBeDefined();
            expect(user.auth_token_exp).toBeDefined();
        });

        test("when username and password don't match", ():void => {
            var userRepository:UserRepository = new UserRepositoryMemory();
            var useCase:AuthenticationUseCase = new AuthenticationUseCase(userRepository);

            userRepository.Create(
                new User("name","mail","no-pass","username")
            );

            expect(() => {
                useCase.execute("username", "password")
            }).toThrow(UnauthorizedError);
        });
    });

    test("when user doesn't exist", ():void => {
        var userRepository:UserRepository = new UserRepositoryMemory();
        var useCase:AuthenticationUseCase = new AuthenticationUseCase(userRepository);

        userRepository.Create(
            new User("name","mail","no-pass","no-name")
        );

        expect(()=>{
            useCase.execute("username", "password")
        }).toThrow(UnauthorizedError);
    });
});