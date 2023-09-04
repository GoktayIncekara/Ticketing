import request from "supertest"; //It will allow us to fake a request to the express application
import { app } from "../../app";

it("should respond with details about the current user", async () => {
  const cookie = await global.signup();

  //It does not follow up in the upcoming request like in the browsers or postman
  const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("should respond with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
