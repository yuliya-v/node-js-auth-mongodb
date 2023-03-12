import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRE_TIME, JWT_SECRET_KEY } from '../config/config.js';
import { StatusCodes } from 'http-status-codes';
import { AuthorizationError, NotFoundError } from '../errors/appErrors.js';

export const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  user.save((err) => {
    if (err) {
      throw new Error(err.message);
    }
  });

  res.status(StatusCodes.OK).send({
    id: user._id,
    username: user.username,
    email: user.email,
  });
};

export const signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      throw new Error(err.message);
    }

    if (!user) {
      throw new NotFoundError('User Not found');
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      throw new AuthorizationError('Invalid Password');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE_TIME,
    });

    res.status(StatusCodes.OK).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};
