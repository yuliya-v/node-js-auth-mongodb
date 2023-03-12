import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config.js';
import {
  AuthenticationError,
  AuthorizationError,
} from '../errors/appErrors.js';

export const verifyToken = (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    throw new AuthorizationError();
  }

  jwt.verify(token, JWT_SECRET_KEY, (err) => {
    if (err) {
      throw new AuthenticationError();
    }
    return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  });
};
