import mongoose from 'mongoose';
import { app } from './app.js';
import { MONGO_CONNECTION_STRING, PORT } from './config/config.js';

try {
  mongoose.set('strictQuery', true);
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log('App is running on port ' + PORT);
  });
} catch (err) {
  console.log(err);
}
