import { response } from "express";
import UserRepositoryMemory from "../adapters/memory/user_repository";
import User from "../entities/user";
import CreateUserUseCase from "./create_user_use_case";


describe("CreateUserUseCase", () : void => {
    test("it creates an user in the database", () : void => {
        const name = "Jhon Due";
        const email = "foo@bar.com";
        const password = "123456";
        const username = "foobar";
        
        var repository: UserRepositoryMemory = new UserRepositoryMemory();
        var useCase: CreateUserUseCase = new CreateUserUseCase(repository);
        var user:User = useCase.execute(name, email, password, username);

        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        expect(user.username).toBe(username);

        expect(user.id).toBe(0);
        expect(repository.List().length).toBe(1);
    })
});
