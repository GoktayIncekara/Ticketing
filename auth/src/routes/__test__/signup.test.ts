import request from "supertest"; //It will allow us to fake a request to the express application
import { app } from "../../app";

it("should return 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test123@test.com",
      password: "password",
    })
    .expect(201);
});

it("should return 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "dflşdskflkkl",
      password: "password",
    })
    .expect(400);
});

it("should return 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "p",
    })
    .expect(400);
});

it("should return 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "dlkjdk" })
    .expect(400);
});
