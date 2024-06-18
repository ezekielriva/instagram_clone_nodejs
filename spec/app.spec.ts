import request from "supertest";
import app from "../app";

test("test root page", () => {
    return request(app)
        .get("/")
        .expect(200)
});