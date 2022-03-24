export class ApiError extends Error {}

export class ValidationError extends ApiError {
  constructor(error) {
    super("Validation Error");
    this.data = error;
  }
  get statusCode() {
    return 422;
  }
}
export class NotFoundError extends ApiError {
  constructor(message, error) {
    super(message || "The resource provided does not exists");
    this.data = error;
  }
  get statusCode() {
    return 404;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message || "Unauthorised!");
  }
  get statusCode() {
    return 401;
  }
}
export class BadRequestError extends ApiError {
  constructor(message, error) {
    super(message || "A bad request was sent");
    this.data = error;
  }
  get statusCode() {
    return 400;
  }
}
export class ExistsError extends ApiError {
  constructor(message) {
    super(message || "The resource provided already exists");
  }

  get statusCode() {
    return 403;
  }
}
export class InternalError extends ApiError {
  constructor(error) {
    super("Internal Server Error");
    this.data = error.message || error;
  }
  get statusCode() {
    return 500;
  }
}
