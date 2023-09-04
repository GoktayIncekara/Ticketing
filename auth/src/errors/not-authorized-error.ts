import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401; //Forbidden from accessing this
  constructor() {
    super("Not Authorized"); //Just for logging purposes, it wont be showed to the user

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
