export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.status = 500;
  }
}

export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.status = 404;
  }
}

export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.status = 404;
  }
}
