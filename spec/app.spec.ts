import request from "supertest";
import app from "../app";

test("Home", () => {
    return request(app)
        .get("/")
        .expect(200);
});