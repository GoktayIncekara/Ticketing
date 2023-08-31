import express from "express";
import "express-async-errors";

import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

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

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); //the name of the service to connect to mongodb. And it will create a db automatically called auth (since we wrote it like that here)
    console.log("connected");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start();
