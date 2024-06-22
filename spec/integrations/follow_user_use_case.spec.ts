import request from "supertest";
import app from "../../app";
import { BuildUser } from "../factories/user_factory";

describe("Follow User UseCase", () => {
    describe("when auth user", () => {
        var cookies:string = "";
        var currentUser = BuildUser();
        var user = BuildUser();

        beforeAll( async ()=>{
            var agent = request(app);

            await agent
                .post("/users")
                .send({ name: currentUser.name, email: currentUser.email, password: "pass", username: currentUser.username })
                .then( (res) => {
                    currentUser.id = res.body.id;
                });

            await agent
                .post("/users")
                .send({ name: user.name, email: user.email, password: "pass", username: user.username })
                .then( (res) => {
                    user.id = res.body.id;
                });

            await agent
                .post("/auth/sign_in")
                .send({ username: currentUser.username, password: "pass" })
                .then((res) => {
                    cookies = res.header['set-cookie'];
                });
        });

        test("it follows an user", () => {
            return request(app)
                .post(`/users/${user.id}/follow`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set("Cookie", cookies)
                .expect('Content-Type', /json/)
                .expect(200)
        });

        test("it cannot follow itself", () => {
            return request(app)
                .post(`/users/${currentUser.id}/follow`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set("Cookie", cookies)
                .expect('Content-Type', /json/)
                .expect(422)
                .then( (res) => {
                    expect(res.body.error).toBeDefined();
                });
        });
    });

    describe("when unauth user", () => {
        test("it returns 401", () => {
            return request(app)
                .post(`/users/1/follow`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401);
        })
    });
});
