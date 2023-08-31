import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = "Not Found";
  constructor() {
    super("Route not found"); //Just for logging purposes, it wont be showed to the user

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
