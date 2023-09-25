import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper"; //We are importing the real one but jets will replace it with the mock one

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

it("should return an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "", price: 10 })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ price: 10 })
    .expect(400);
});
it("should return an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "jhjkhkjh", price: -10 })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "jhkjhjk" })
    .expect(400);
});

it("should  create a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "flkjgkf", price: 20 })
    .expect(201);
  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
});

it("should publish an event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "flkjgkf", price: 20 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
