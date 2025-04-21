export class HttpError extends Error {
  constructor(private readonly status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string) {
    super(422, message);
  }
}
