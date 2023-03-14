import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { errorHandler } from './errors/errorHandler.js';
import { authRoutes } from './routes/auth.routes.js';
import { testRoutes } from './routes/test.routes.js';
import { fileURLToPath } from 'url';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(
  path.join(__dirname, '..', 'doc', 'api.yaml')
);

app.use(express.json());
app.use(cors());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

authRoutes(app);
testRoutes(app);
app.use(errorHandler);
