import User from "../../entities/user";
import UserUseCase from "../../use_cases/user_use_case";

describe("Create a user", () => {
    test("it creates an user", () : void => {
        const name = "Jhon Due";
        const email = "foo@bar.com";
        const password = "123456";
        const username = "foobar";
        
        var useCase : UserUseCase = new UserUseCase();
        var user : User = useCase.CreateUser(name, email, password, username);

        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
        expect(user.password).toBe(password);
        expect(user.username).toBe(username);
    })
});
