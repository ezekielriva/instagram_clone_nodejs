import request from "supertest";
import app from "../../app";

test("Create User Use Case", () => {
    return request(app)
        .post("/users")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ 
            name: "John", 
            username: "foobar", 
            email: "foo@bar.com", 
            password: "1234" 
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body.name).toBe("John");
            expect(response.body.username).toBe("foobar");
            expect(response.body.email).toBe("foo@bar.com");
        });
});