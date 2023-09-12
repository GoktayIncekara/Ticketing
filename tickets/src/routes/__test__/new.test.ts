import request from "supertest";
import { app } from "../../app";

it("should have a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("should only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("should return a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("should return an error if an invalid title is provided", async () => {});
it("should return an error if an invalid price is provided", async () => {});

it("should  create a ticket with valid inputs", async () => {});
