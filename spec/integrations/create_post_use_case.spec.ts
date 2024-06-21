import request from "supertest";
import app from "../../app";
import { Cookie } from "express-session";

describe("CreatePost UseCase", () => {
    describe("when auth user", () => {
        var cookies:string = "";

        beforeAll( async ()=>{
            var agent = request(app);

            await agent
                .post("/users")
                .send({ name: "name", email: "mail", password: "pass", username: "username" });

            await agent
                .post("/auth/sign_in")
                .send({ username: "username", password: "pass" })
                .then((res) => {
                    cookies = res.header['set-cookie'];
                });
        })

        test("it creates a post", () => {
            return request(app)
                .post("/posts")
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set("Cookie", cookies)
                .send({ image: "12345" })
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body.user.username).toBe("username");
                    expect(response.body.image).toBe("12345");
                });
        });
    });

    describe("when unauth user", () => {
        test("it returns 401", () => {
            return request(app)
                .post("/posts")
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({ image: "12345" })
                .expect('Content-Type', /json/)
                .expect(401);
        });
    });
});
