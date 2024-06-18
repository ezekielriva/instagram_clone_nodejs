import request from "supertest";
import app from "../../app";

test("Create Post Use Case", () => {
    return request(app)
        .post("/posts")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ image: "12345" })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body.user.username).toBe("username");
            expect(response.body.image).toBe("12345");
        });
});