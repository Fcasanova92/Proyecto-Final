import {
  BadRequest,
  InternalServerError,
  NotFound,
  NotAuthorized,
} from '../../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof InternalServerError) {
    return res
      .status(500)
      .json({ name: err.name, message: err.message, dataError: null });
  }

  if (err instanceof NotFound) {
    return res
      .status(404)
      .json({ name: err.name, message: err.message, dataError: err.data });
  }

  if (err instanceof BadRequest) {
    return res
      .status(400)
      .json({ name: err.name, message: err.message, dataError: err.data });
  }

  if (err instanceof NotAuthorized) {
    return res
      .status(401)
      .json({ name: err.name, message: err.message, dataError: err.field });
  }

  res.status(500).json({ name: err.name, message: err.message });
};
