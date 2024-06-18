import request from "supertest";
import app from "../../app";

test("Create Post Use Case", () => {
    return request(app)
        .post("/posts")
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ 
            user: {
                name: "John", 
                username: "foobar", 
                email: "foo@bar.com", 
                password: "1234" 
            },
            image: "12345" 
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body.user.username).toBe("foobar");
            expect(response.body.image).toBe("12345");
        });
});