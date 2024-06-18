import request from "supertest";
import app from "../../app";

test("Follow User Use Case", () => {
    return request(app)
        .post("/users/1/follow")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
});