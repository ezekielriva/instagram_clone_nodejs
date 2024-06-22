import request from "supertest";
import app from "../../app";
import path from "path";

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
            var image = path.join(__dirname, "..", "mocks", "1x1.png");
            return request(app)
                .post("/posts")
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set("Cookie", cookies)
                .attach("image", image)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body.post.user.username).toBe("username");
                    expect(response.body.post.image.originalname).toBe("1x1.png");
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
