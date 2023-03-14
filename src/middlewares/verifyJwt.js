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
    next(new AuthorizationError('No token provided'));
    return;
  }

  jwt.verify(token, JWT_SECRET_KEY, (err) => {
    if (err) {
      next(new AuthenticationError('Invalid token'));
      return;
    }
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  });
};
