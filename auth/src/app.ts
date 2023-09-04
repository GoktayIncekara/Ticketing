import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); //To make sure that express is aware that is behind the proxy of ingress-ngx and make sure it trust the traffic
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
); //secure:true means that cookies are only going to be shared when someone is making a request to our server over an https connection

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

export { app };
