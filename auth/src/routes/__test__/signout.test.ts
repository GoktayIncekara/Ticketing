import request from "supertest"; //It will allow us to fake a request to the express application
import { app } from "../../app";

it("should clear the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test123@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200); //Expect is not necesarry but its says that hey we completed the request succesfully

  expect(response.get("Set-Cookie")).toBeDefined();
});
