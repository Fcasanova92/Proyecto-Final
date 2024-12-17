export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.status = 500;
  }
}

export class BadRequest extends Error {
  constructor(message, data = null) {
    super(message);
    this.name = 'BadRequest';
    this.status = 400;
    this.data = data;
  }
}

export class NotFound extends Error {
  constructor(message, data = null) {
    super(message);
    this.name = 'NotFound';
    this.status = 404;
    this.data = data;
  }
}

export class NotAuthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.status = 401;
  }
}
