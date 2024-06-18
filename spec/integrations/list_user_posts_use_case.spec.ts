import request from "supertest";
import app from "../../app";

test("List User Posts", () => {
    return request(app)
        .get("/users/1/posts")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body.posts.length).toBe(2);
        });
});