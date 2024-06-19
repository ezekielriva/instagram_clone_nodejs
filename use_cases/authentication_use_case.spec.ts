import UserRepositoryMemory from "../adapters/memory/user_repository";
import User from "../entities/user";
import AuthenticationUseCase from "./authentication_use_case";
import UserRepository from "./repositories/user_repository";

describe("AuthenticationUseCase", ():void => {
    describe("when user exist", ():void => {
        test("when username and password matches", ():void => {
            var userRepository:UserRepository = new UserRepositoryMemory();
            var useCase:AuthenticationUseCase = new AuthenticationUseCase(userRepository);

            userRepository.Create(
                new User("name","mail","password","username")
            );

            expect(
                useCase.execute("username", "password")
            ).toBeInstanceOf(User);
        });

        test("when username and password don't match", ():void => {
            var userRepository:UserRepository = new UserRepositoryMemory();
            var useCase:AuthenticationUseCase = new AuthenticationUseCase(userRepository);

            userRepository.Create(
                new User("name","mail","no-pass","username")
            );

            expect(
                useCase.execute("username", "password")
            ).toBe(undefined);
        });
    });

    test("when user doesn't exist", ():void => {
        var userRepository:UserRepository = new UserRepositoryMemory();
        var useCase:AuthenticationUseCase = new AuthenticationUseCase(userRepository);

        userRepository.Create(
            new User("name","mail","no-pass","no-name")
        );

        expect(
            useCase.execute("username", "password")
        ).toBe(undefined);
    });
});