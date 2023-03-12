import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message || ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
  next();
};
