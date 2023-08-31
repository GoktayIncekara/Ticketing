export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message); //Just for logging purposes, it wont be showed to the user

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
