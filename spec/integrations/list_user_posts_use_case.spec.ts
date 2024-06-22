import request from "supertest";
import app from "../../app";
import path from "path";
import { TUserID } from "../../entities/user";

describe("List User Posts", () => {
    describe("when auth user", () => {
        var cookies:string = "";
        var image = path.join(__dirname, "..", "mocks", "1x1.png");
        var userId:TUserID;

        beforeAll( async ()=>{
            var agent = request(app);

            await agent
                .post("/users")
                .send({ name: "name", email: "mail", password: "pass", username: "username" })
                .then((res) => {
                    userId = res.body.id;
                });

            await agent
                .post("/auth/sign_in")
                .send({ username: "username", password: "pass" })
                .then((res) => {
                    cookies = res.header['set-cookie'];
                });

            await agent
                .post("/posts")
                .set("Cookie", cookies)
                .attach("image", image)
        });

        test("it list any user posts", () => {
            return request(app)
                .get(`/users/${userId}/posts`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set("Cookie", cookies)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body.posts.length).toBe(1);
                });
        });
    })
});