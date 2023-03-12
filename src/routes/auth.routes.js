import { signin, signup } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyJwt.js';
import { checkDuplicateUserEmail } from '../middlewares/verifySignUp.js';

export const authRoutes = (app) => {
  app.post('/auth/signup', [checkDuplicateUserEmail], signup);
  app.post('/auth/signin', signin);
  app.post('/auth/jwt-check', [verifyToken]);
};
