import request, { Response } from "supertest";
import app from "../../app";

describe("AuthenticateUseCase", ():void => {
    test("when user exists.when send right credentials.it returns 200", async () => {
        var agent = request(app)

        await agent
            .post("/users")
            .send({ name: "name", email: "mail", password: "pass", username: "username" });

        await agent
            .post("/auth/sign_in")
            .send({ username: "username", password: "pass" })
            .expect(200)
    });

    test("when user exists.when send wrong credentials.it returns 401", async() => {
        var agent = request(app)

        await agent
            .post("/users")
            .send({ name: "name", email: "mail", password: "pass", username: "username" });

        await agent
            .post("/auth/sign_in")
            .send({ username: "username", password: "no-pass" })
            .expect(401);
    });
});