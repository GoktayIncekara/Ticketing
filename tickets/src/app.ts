import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@ticketsgi/common";
import { createTicketRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); //To make sure that express is aware that is behind the proxy of ingress-ngx and make sure it trust the traffic
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
); //secure:true means that cookies are only going to be shared when someone is making a request to our server over an https connection
app.use(currentUser);
app.use(createTicketRouter);

app.all("*", async (req, res) => {
  //Bcs of express-async-errors we would be able to get the async keyword to work in express
  throw new NotFoundError();
});

/*
app.all("*", () => {
  throw new NotFoundError();
});
*/

/*
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});
*/

app.use(errorHandler);

export { app };
