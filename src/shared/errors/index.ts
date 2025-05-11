export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(content: any) {
    super(422, content);
  }
}
export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}
export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}
export class ConflictError extends HttpError {
  constructor(message: string) {
    super(409, message);
  }
}
export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}
