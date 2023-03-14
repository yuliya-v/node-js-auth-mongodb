import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config.js';
import {
  AuthenticationError,
  AuthorizationError,
} from '../errors/appErrors.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    next(new AuthorizationError());
    return;
  }

  jwt.verify(token, JWT_SECRET_KEY, (err) => {
    if (err) {
      next(new AuthenticationError());
      return;
    }
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  });
};
