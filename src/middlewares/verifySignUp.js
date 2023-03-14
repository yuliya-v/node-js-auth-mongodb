import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserExistsError } from '../errors/appErrors.js';
import { User } from '../models/user.model.js';

export const checkDuplicateUserEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      return;
    }

    if (user) {
      next(new UserExistsError('User with this e-mail exists'));
      return;
    }

    next();
  });
};
