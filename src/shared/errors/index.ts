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
export class badRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}
