import { User } from '../models/user.model.js';

export const testRoutes = (app) => {
  app.get('/test/all-users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
  });
};
