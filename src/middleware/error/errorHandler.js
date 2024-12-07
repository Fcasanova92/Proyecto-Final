import {
  BadRequest,
  InternalServerError,
  NotFound,
  NotAuthorized,
} from '../../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof InternalServerError) {
    return res.status(500).json({ message: err.message });
  }

  if (err instanceof NotFound) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof BadRequest) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof NotAuthorized) {
    return res.status(401).json({ message: err.message, field: err.field });
  }

  res.status(500).json({ message: err.message });
};
